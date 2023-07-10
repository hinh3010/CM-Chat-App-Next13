"use client";
import Card from "@/artworks/components/Card";

const ListArtworks = ({ artworks }) => {
    return (
        <ul className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {
                artworks.map(artwork => (
                    <li
                        key={artwork._id}
                        className="
                            p-2 rounded-lg border cursor-pointer m-4 col-span-1 bg-white
                        "
                    >
                        <Card artwork={artwork} />
                    </li>
                ))
            }

        </ul>
    );
}

export default ListArtworks;