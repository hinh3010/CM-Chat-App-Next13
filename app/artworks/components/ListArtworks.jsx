'use client'

import Image from "next/image";
import { useState } from "react";
import Card from "~/app/components/ui/Card";
import { images } from "~/public/images";

const ListArtworks = () => {
    const [loading, setLoading] = useState(true);
    const [imageErr, setImageErr] = useState(false)
    return (
        <ul className="flex-1">
            {
                [...Array(10).keys()].map((item, i) => (
                    <li
                        key={i}
                        style={{ background: '#F8F9FA' }}
                        className="
                                    p-2 rounded-lg border
                                    transition-all ease-in-out cursor-pointer
                                    flex items-center my-2
                                "
                    >
                        <Card />
                    </li>
                ))
            }
        </ul>
    );
}

export default ListArtworks;