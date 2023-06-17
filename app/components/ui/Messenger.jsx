'use client'
import Image from "next/image";
import { useState } from "react";
import { images } from "~/public/images";

function Messenger({ src, ...rest }) {
    const [loading, setLoading] = useState(true);
    return (
        <div style={{ borderRadius: '12px' }} className="relative cursor-pointer avatar overflow-hidden shadow" {...rest}>
            <Image
                src={images.rectangle}
                alt="Avatar"
                width={256}
                height={256}
                className={`object-cover w-full h-auto transition-opacity duration-200 ${loading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => {
                    setLoading(false);
                }}
            />
            <Image
                src={images.chat}
                alt="Avatar"
                width={256}
                height={256}
                className={`absolute w-10 h-10 inset-0 m-auto`}
            />
            {loading && <div className="absolute w-full h-full top-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
        </div>
    );
}

export default Messenger