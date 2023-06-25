"use client";

import Image from "next/image";
import { useId, useState } from "react";
import Modal from "~/app/components/ui/Modal";
import { images } from "~/public/images";
import { PREFIX_LOG } from "../const";
import ProgressBar from "~/app/components/ui/ProgressBar";

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

    // upload image with drag
    const uploadFile = async (file) => {
        console.time(`${PREFIX_LOG}[upload image]`)
        try {
            console.log("🚀 ~ file: ModalUpload.jsx:27 ~ uploadFile ~ file:", file)
        } catch (error) {

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
                    />
                    <Image className='w-24 h-24' src={images.uploadIcon} alt="" />
                    <p className="text-2xl mt-4">
                        Click or drag and drop file to upload
                    </p>
                    <ProgressBar />
                </label>
            </div>
        </Modal >
    );
}

export default ModalUpload;
