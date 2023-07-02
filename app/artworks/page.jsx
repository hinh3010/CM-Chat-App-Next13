'use client'
import { useEffect } from "react";
import FilterArtworks from "./components/FilterArtworks";
import ListArtworks from "./components/ListArtworks";
import axios from "axios";

export default function Page() {

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                // const response = await fetch('/api/artworks', {
                //     method: 'GET',
                // });

                const response = await axios.get('/api/artworks')

                console.log({ response });
            } catch (error) {
                console.error({ error });
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