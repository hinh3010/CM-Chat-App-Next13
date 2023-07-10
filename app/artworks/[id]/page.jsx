'use client'
import { useEffect, useState } from "react";
import axiosClient from "~/helper/axiosClient";
import toaster from "~/helper/toaster";
import CanvasWrapper from "../components/CanvasWrapper";
import Customize from "../components/Customize";
import ListLayers from "../components/ListLayers";
import Loading from "../components/Loading";
import ListLayersShimmer from "../components/ListLayersShimmer";

function PageDetail({ params }) {
    const [dataArtwork, setDataArtwork] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const id = params.id
        if (!id) return

        let timeout
        const fetchArtworks = async () => {
            setLoading(true)
            try {
                const artwork = await axiosClient.get('/api/artworks/' + id)
                setDataArtwork(artwork)

            } catch (error) {
                toaster.error(error.message, { className: 'text-3xl shadow' })
            }
            timeout = setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
        fetchArtworks()
        // Clean up
        return () => {
            clearTimeout(timeout)
        }
    }, [params.id])

    return (
        <main
            className="h-full w-full grid grid-cols-4"
        >
            {loading && <Loading />}
            <section
                className="w-full h-full col-span-1 p-2"
            >
                {true
                    ? <ListLayersShimmer />
                    : <ListLayers />
                }
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

