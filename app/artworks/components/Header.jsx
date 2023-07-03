'use client'

import { useState } from "react";
import ModalUpload from "./ModalUpload";
import toaster from "~/helper/toaster";
import axiosClient from "~/helper/axiosClient";

const Header = () => {
    const [showModal, setShowModal] = useState(false)

    const onChange = async (event) => {
        event.preventDefault();
        const file = event.target.files[0]

        const formData = new FormData();
        formData.append('file', file);

        try {
            const { fileUrl } = await axiosClient.post('/api/uploads', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            console.log({ fileUrl });
        } catch (error) {
            console.log({ error });
            toaster.error(error.message, { className: 'text-3xl shadow' })
        }
    }

    return (
        <>
            <div className="w-full h-24 flex items-center justify-between px-8 bg-white rounded-b-2xl">
                <span
                    className="text-3xl font-medium cursor-pointer"
                >
                    Artworks Library
                </span>
                <button
                    onClick={() => setShowModal(true)}
                    className="text-xl font-medium bg-blue-700 text-white rounded-lg cursor-pointer px-6 py-4"

                >
                    Upload Artwork
                </button>
                <input type="file" onChange={onChange} />
            </div>
            {
                showModal &&
                <ModalUpload
                    onCancel={() => setShowModal(false)}
                    onOk={() => setShowModal(false)} />
            }
        </>
    );
}

export default Header;