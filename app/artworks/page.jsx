'use client'
import { useEffect } from "react";
import axiosClient from "~/helper/axiosClient";
import toaster from "~/helper/toaster";
import FilterArtworks from "./components/FilterArtworks";
import ListArtworks from "./components/ListArtworks";

export default function Page() {

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const { artworks } = await axiosClient.get('/api/artworks')

                console.log({ artworks });
                throw new Error('adu')
            } catch (error) {
                console.log({ error });
                toaster.error(error.message, { className: 'text-3xl shadow' })
            }
        }
        fetchArtworks()
    }, [])

    return (
        <main className="w-full h-full border rounded-2xl p-2 bg-white">
            <FilterArtworks />
            <ListArtworks />
        </main>
    )
}