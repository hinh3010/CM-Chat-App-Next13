'use client'
import Image from "next/image";
import { useState } from "react";


function Avatar({ src, className, ...rest }) {
    const [loading, setLoading] = useState(true);

    return (
        <div className={"avatar cursor-pointer " + className}{...rest}>
            <div className="relative rounded-full w-full h-full overflow-hidden shadow">
                <Image
                    src={src}
                    alt="Avatar"
                    width={256}
                    height={256}
                    className={`w-full h-auto transition-opacity duration-200 ${loading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => {
                        setLoading(false);
                    }}
                />
                {loading && <div className="absolute w-full h-full top-0 animate-pulse bg-gray-100 dark:bg-gray-900" />}
            </div>
        </div>
    );
}

export default Avatar