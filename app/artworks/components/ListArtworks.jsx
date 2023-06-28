'use client'

import Image from "next/image";
import { useState } from "react";
import Card from "~/app/artworks/components/Card";
import { images } from "~/public/images";


//  [...Array(10).keys()]
const array = Array.from({ length: 10 }, (_, index) => ({
    height: 5302,
    mime_type: 'image/vnd.adobe.photoshop',
    name: 'marry-me.psd',
    image: 'https://d5xh8as6wnpix.cloudfront.net/thumb/artwork/w_180,h_220/hinhtvv/artwork-templates/ac4e41c4336a485b8d3226c67d5b60dc.png',
    width: 4838,
    _id: index,
}))

const ListArtworks = () => {
    const [loading, setLoading] = useState(true);
    const [imageErr, setImageErr] = useState(false)
    return (
        <ul className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {
                array.map(item => (
                    <li
                        key={item._id}
                        className="
                            p-2 rounded-lg border cursor-pointer m-4 col-span-1 bg-white
                        "
                    >
                        <Card artwork={item} />
                    </li>
                ))
            }
        </ul>
    );
}

export default ListArtworks;