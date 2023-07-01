/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import Modal from "~/app/components/ui/Modal";
import ProgressBar from "~/app/components/ui/ProgressBar";
import { images } from "~/public/images";
import { WORKER_PARSE_ARTWORK, WORKER_PARSE_LAYER_ARTWORK } from "../const";
import { generateBlob, generateBlobUseOffscreenCanvas, isSupportedOffscreenCanvas, readFileAsArrayBuffer } from "../helper";
import { createMessage } from "../helper/messaging";
import { useDispatch } from "react-redux";
import { artworkDetailActions } from "~/stores/reducers/artworkDetail.reducer";

function ModalUpload({ onCancel, onOk }) {
    const workerRef = useRef(null)
    const dispatch = useDispatch()
    const id = useId()
    const [currentFileUrl, setCurrentFileUrl] = useState('')
    const [pending, setPending] = useState(false)

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const file = e.dataTransfer.files[0]
        return uploadFile(file)
    }

    const onSelectFile = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        const { files, value } = e.target
        if (!files?.length) return

        setCurrentFileUrl(value)
        await uploadFile(files[0])
        setCurrentFileUrl('')
    }

    const uploadFile = async (file) => {
        setPending(true)
        readFileAsArrayBuffer(file).then((buffer) => {
            workerRef.current?.postMessage(createMessage(WORKER_PARSE_ARTWORK, buffer), [buffer]);
        })

        workerRef.current.onmessage = async (event) => {
            console.log('WebWorker Response =>', event.data)
            const { message, value } = event.data
            if (message !== WORKER_PARSE_LAYER_ARTWORK) return

            console.log('WebWorker Response', value)

            const createBlob = isSupportedOffscreenCanvas() ? generateBlobUseOffscreenCanvas : generateBlob

            const artworkPayloads = [...value]

            for (const [idx, layer] of artworkPayloads.entries()) {
                const blob = await createBlob({
                    width: layer.width,
                    height: layer.height,
                    composite: layer.image,
                })

                const imageURL = URL.createObjectURL(blob)
                layer.image = imageURL

                if (idx === 0) {
                    layer.name = file.name
                }
            }

            dispatch(artworkDetailActions.createArtworkTemplates({
                artworkContainer: artworkPayloads[0],
                artworkLayers: artworkPayloads.splice(1, artworkPayloads.length - 1)
            }))

            setPending(false)
        }
    }

    useEffect(() => {
        workerRef.current = new Worker(new URL('../helper/worker.js', import.meta.url), {
            type: "module",
        })
        // workerRef.current.onmessage = (event) => {
        //     console.log('WebWorker Response =>', { adu: event.data })
        // }
        return () => {
            workerRef.current?.terminate()
        }
    }, [])

    return (
        <Modal
            onCancel={onCancel}
            onOk={onOk}
            title="Upload Artwork"
        >
            <div
                className="flex items-start border-2 border-dashed border-gray-300"
                style={{ width: '700px', height: '200px' }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {
                    pending ?
                        <ProgressBar className="m-auto" />
                        : <label
                            htmlFor={id}
                            className="
                                cursor-pointer w-full h-full 
                                flex items-center justify-center 
                                flex-col text-blue-700
                            "
                        >

                            :<input
                                id={id} type="file"
                                className="hidden"
                                onChange={onSelectFile}
                                value={currentFileUrl}
                                accept="psd"
                            />
                            <Image className='w-24 h-24' src={images.uploadIcon} alt="" />
                            <p className="text-2xl mt-4">
                                Click or drag and drop file to upload
                            </p>
                        </label>
                }
            </div>
        </Modal >
    );
}

export default ModalUpload;
