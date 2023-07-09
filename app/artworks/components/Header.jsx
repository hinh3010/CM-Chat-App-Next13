'use client'

import { useState } from "react";
import ModalUpload from "./ModalUpload";
import toaster from "~/helper/toaster";
import axiosClient from "~/helper/axiosClient";
import { fakeArtwork } from "../adu";
import Link from "next/link";

const Header = () => {
    const [showModal, setShowModal] = useState(false)

    const onClick = async (event) => {
        event.preventDefault();

        try {
            const response = await axiosClient.post('/api/artworks', {
                ...fakeArtwork, layers: JSON.stringify(fakeArtwork.layers)
            });
            console.log({ response });
        } catch (error) {
            console.log({ error });
            toaster.error(error.message, { className: 'text-3xl shadow' })
        }
    }

    return (
        <header>
            <div className="w-full h-24 flex items-center justify-between px-8 bg-white rounded-b-2xl">
                <Link
                    href={'/artworks'}
                    className="text-3xl font-medium cursor-pointer"
                // onClick={onClick}
                >
                    Artworks Library
                </Link>
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
                    onOk={() => setShowModal(false)} />
            }
        </header>
    );
}

export default Header;