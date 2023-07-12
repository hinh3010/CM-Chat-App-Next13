'use client'

import { useCallback, useEffect, useState } from "react";
import FilterArtworks from "./components/FilterArtworks";
import toaster from "~/helper/toaster";
import axiosClient from "~/helper/axiosClient";
import ListArtworks from "./components/ListArtworks";
import ListArtworksSimmer from "./components/ListArtworksShimmer";

export default function Page() {

    const [artworks, setArtworks] = useState([])
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState({
        limit: 24,
        page: 1,
    })

    const fetchArtworks = useCallback(async () => {
        setLoading(true)
        try {
            const { docs } = await axiosClient.get('/api/artworks', { params })
            setArtworks(docs)
        } catch (error) {
            toaster.error(error.message, { className: 'text-3xl shadow' })
        } finally {
            setLoading(false)
        }
    }, [params])

    useEffect(() => {
        fetchArtworks()
    }, [fetchArtworks])

    return (
        <main className="w-full h-full border rounded-2xl p-2 bg-white">
            <FilterArtworks />
            {
                loading
                    ? <ListArtworksSimmer />
                    : <ListArtworks artworks={artworks} />
            }
        </main>
    )
}

