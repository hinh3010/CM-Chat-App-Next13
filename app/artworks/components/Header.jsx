'use client'

import { useState } from "react";
import ModalUpload from "./ModalUpload";

const Header = () => {
    const [showModal, setShowModal] = useState(false)
    const handleUpload = () => {
        console.log("Upload")
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
            </div>
            {
                showModal &&
                <ModalUpload
                    onCancel={() => setShowModal(false)}
                    onOk={handleUpload} />
            }
        </>
    );
}

export default Header;