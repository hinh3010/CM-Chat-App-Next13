'use client'
import Image from "next/image";
import { useState } from "react";
import { images } from "~/public/images";

function Logo({ src, ...rest }) {
    const [loading, setLoading] = useState(true);
    return (
        <div style={{ borderRadius: '12px' }} className="relative cursor-pointer w-24 h-24 overflow-hidden shadow" {...rest}>
            <Image
                src={images.logo}
                alt="Avatar"
                width={256}
                height={256}
                className={`object-cover w-full h-auto transition-opacity duration-200 ${loading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => {
                    setLoading(false);
                }}
            />
            <Image
                src={images.budgie}
                alt="Avatar"
                width={256}
                height={256}
                className={`absolute w-14 h-14 inset-0 m-auto`}
            />
            {loading && <div className="absolute w-full h-full top-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
        </div>
    );
}

export default Logo