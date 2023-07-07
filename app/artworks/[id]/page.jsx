'use client'
import { useEffect, useState } from "react";
import axiosClient from "~/helper/axiosClient";
import toaster from "~/helper/toaster";
import CanvasWrapper from "../components/CanvasWrapper";
import Customize from "../components/Customize";
import ListLayers from "../components/ListLayers";

function PageDetail({ params }) {
    const [dataArtwork, setDataArtwork] = useState(null)

    useEffect(() => {
        const id = params.id
        if (!id) return
        const fetchArtworks = async () => {
            try {
                const artwork = await axiosClient.get('/api/artworks/' + id)
                setDataArtwork(artwork)

            } catch (error) {
                toaster.error(error.message, { className: 'text-3xl shadow' })
            }
        }
        fetchArtworks()
    }, [params.id])

    return (
        <main
            className="h-full w-full grid grid-cols-4"
        >
            <section
                className="w-full h-full col-span-1 p-2"
            >
                <ListLayers />
            </section>
            <section
                className="w-full h-full col-span-2 p-2"
            >
                <CanvasWrapper dataArtwork={dataArtwork} />
            </section>
            <section
                className="w-full h-full col-span-1 p-2"
            >
                <Customize />
            </section>
        </main>
    )
}

export default PageDetail

