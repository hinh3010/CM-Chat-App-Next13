'use client'

import { useEffect, useState } from "react";
import FilterArtworks from "./components/FilterArtworks";
import toaster from "~/helper/toaster";
import axiosClient from "~/helper/axiosClient";
import ListArtworks from "./components/ListArtworks";

export default function Page() {

    const [artworks, setArtworks] = useState([])
    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const { docs } = await axiosClient.get('/api/artworks')
                setArtworks(docs)
            } catch (error) {
                toaster.error(error.message, { className: 'text-3xl shadow' })
            }
        }
        fetchArtworks()
    }, [])

    return (
        <main className="w-full h-full border rounded-2xl p-2 bg-white">
            <FilterArtworks />
            <ListArtworks artworks={artworks} />
        </main>
    )
}

