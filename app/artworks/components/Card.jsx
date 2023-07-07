"use client";

import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Card(props) {
    const { artwork } = props;
    const [loading, setLoading] = React.useState(true);

    return (
        <Link prefetch href={`/artworks/${artwork._id}`} className="w-full min-h-full flex items-center justify-center">
            <div className="w-full h-auto overflow-hidden shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
                <div
                    style={{ background: '#DEE2E6' }}
                    className="w-full"
                >
                    <div
                        className="
                            flex items-center justify-center overflow-hidden
                            order-b dark:border-gray-800 relative w-full m-auto
                        "
                        style={{
                            width: "320px",
                            height: "240px",
                        }}
                    >
                        <Image
                            alt="Forest"
                            src={artwork.image}
                            className={`
                                artwork-image w-auto h-full
                                ${loading ? "opacity-0" : "opacity-100"}
                            `}
                            width={800}
                            height={600}

                            onLoad={() => {
                                setLoading(false);
                            }}
                        />
                        {loading && (
                            <div className="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100 dark:bg-gray-900" />
                        )}
                    </div>
                </div>
                <div className="p-4 w-ful">
                    <span className="line-clamp-1 text-2xl font-bold hover:underline text-blue-600 hover:text-blue-700 active:text-blue-600">
                        {artwork.name}
                    </span>
                    <p className="py-1 text-xl line-clamp-3">
                        Width: <b className="text-orange-700">{artwork.width}</b>
                        {" "}
                        Height:<b className="text-orange-700"> {artwork.height}</b>
                    </p>
                    <p className="py-1 text-xl line-clamp-3">
                        Type: <b className="text-orange-700">{artwork.mimetype}</b>
                        {" "}
                        Layers:<b className="text-orange-700"> {artwork.totalLayers}</b>
                        {" "}
                        Created:<b className="text-orange-700"> {moment(artwork.created_at).fromNow()}</b>
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default Card;
