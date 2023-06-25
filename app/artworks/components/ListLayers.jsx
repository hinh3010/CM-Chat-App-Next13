'use client'

import Image from "next/image";
import { useState } from "react";
import { images } from "~/public/images";

const ListLayers = () => {
    const [loading, setLoading] = useState(true);
    const [imageErr, setImageErr] = useState(false)
    return (
        <div className="w-full h-full border rounded-2xl p-4 flex flex-col bg-white">
            <span
                className="text-3xl font-medium cursor-pointer text-center py-4"
            >
                Layers
            </span>
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
                            <Image
                                className="object-cover rounded-lg"
                                width={40}
                                height={40}
                                src={images.logoTextLayer}
                                alt=""
                                onLoad={() => {
                                    setLoading(false);
                                }}
                                onError={(e) => {
                                    setImageErr(true)
                                    e.target.onerror = null
                                }}
                            />
                            <span className="ml-4 text-2xl line-clamp-1">
                                layer.name
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nesciunt provident nobis natus eligendi repellat, accusamus illo molestias voluptates voluptate animi non! Assumenda culpa eius soluta molestias nemo. Obcaecati, harum.
                            </span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default ListLayers;