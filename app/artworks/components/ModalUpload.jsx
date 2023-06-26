/* eslint-disable @next/next/no-img-element */
"use client";

import Psd from "@webtoon/psd";
import Bluebird from 'bluebird';
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import Modal from "~/app/components/ui/Modal";
import ProgressBar from "~/app/components/ui/ProgressBar";
import { images } from "~/public/images";
import { PREFIX_LOG, WORKER_PARSE_ARTWORK } from "../const";
import { canvasToBlob, generateCanvas, readFileAsArrayBuffer } from "../helper";
import { createMessage } from "../helper/messaging";

function ModalUpload({ onCancel, onOk }) {
    const id = useId()

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

    const [currentFileUrl, setCurrentFileUrl] = useState('')
    const onSelectFile = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        const { files, value } = e.target
        if (!files?.length) return

        setCurrentFileUrl(value)
        await uploadFile(files[0])
        setCurrentFileUrl('')
    }

    const [imageURL, setImageURL] = useState(null)

    const workerRef = useRef(null)
    useEffect(() => {
        workerRef.current = new Worker(new URL('../helper/worker.js', import.meta.url), {
            type: "module",
        })
        workerRef.current.onmessage = (event) =>
            console.log('WebWorker Response =>', event.data)
        return () => {
            workerRef.current?.terminate()
        }
    }, [])

    const uploadFile = async (file) => {
        readFileAsArrayBuffer(file).then((buffer) => {
            workerRef.current?.postMessage(createMessage(WORKER_PARSE_ARTWORK, buffer), [buffer]);
        });
        return


        let artworkContainer = null
        const artworkLayers = []
        console.time(`${PREFIX_LOG}[upload image]`)
        try {
            if (!file) throw new Error("Can't read file")

            const result = await file.arrayBuffer()
            const psdFile = Psd.parse(result)
            console.log("🚀 ~ file: ModalUpload.jsx:51 ~ uploadFile ~ psdFile:", psdFile)

            if (!psdFile || typeof psdFile !== 'object') {
                throw new Error('Failed to parse Psd file')
            }

            const composite = await psdFile.composite(true, true)

            const canvasElement = generateCanvas({
                composite: composite,
                width: psdFile.width,
                height: psdFile.height,
            })

            const blob = await canvasToBlob(canvasElement)
            const imageURL = URL.createObjectURL(blob)
            setImageURL(imageURL)

            artworkContainer = {
                width: psdFile.width,
                height: psdFile.height,
                name: file.name,
                mimeType: file.type,
                image: imageURL,
                size: blob.size,
            }

            async function drawLayers(layers) {
                await Bluebird.each(layers, async (layer, index) => {
                    if (layer.isHidden) return
                    if (layer.type === 'Layer') {
                        const compositeBuffer = await layer.composite()
                        const { width, height } = layer
                        console.log(
                            '🚀 hello cac ban tre  ~ file: ModalUpload.js:72 ~ awaitBluebird.each ~ layer~',
                            layer
                        )
                        const { left, top, name, text, opacity } = layer.layerFrame.layerProperties

                        const canvasElement = generateCanvas({
                            compositeBuffer,
                            width,
                            height,
                        })

                        const blob = await canvasToBlob(canvasElement)
                        const imageURL = URL.createObjectURL(blob)
                        artworkLayers.push({
                            width,
                            height,
                            name,
                            type: text ? 'text' : 'image',
                            font: '6442624a7ada62d544e52468',
                            image: imageURL,
                            size: blob.size,
                            text: text || '',
                            x: left,
                            y: top,
                            index,
                            level: 0,
                            metadata: {
                                opacity: opacity || 1,
                                fontSize: 'norm',
                            },
                        })
                    } else if (layer.type === 'Group') {
                        await drawLayers(layer.children)
                    }
                })
            }

            await drawLayers(psdFile.layers)

            const artworkUpload = [artworkContainer, ...artworkLayers]
            const countLinks = artworkUpload.length
            console.log("🚀 ~ file: ModalUpload.jsx:129 ~ uploadFile ~ countLinks:", countLinks)
        } catch (error) {
            console.log({ error: error })
            console.log({ error: error.message })
        } finally {
            console.timeEnd(`${PREFIX_LOG}[upload image]`)
        }
    }

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
                <label
                    htmlFor={id}
                    className="
                        cursor-pointer w-full h-full 
                        flex items-center justify-center 
                        flex-col text-blue-700
                    "
                >
                    <input
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
                    <ProgressBar />
                    {imageURL && <img className="h-full w-auto object-cover" src={imageURL} alt="" />}
                </label>
            </div>
        </Modal >
    );
}

export default ModalUpload;
