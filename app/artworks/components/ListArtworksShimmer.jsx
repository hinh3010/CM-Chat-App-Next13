"use client";

//  [...Array(10).keys()]
const array = Array.from({ length: 10 }, (_, index) => ({
    height: 5302,
    mime_type: 'image/vnd.adobe.photoshop',
    name: 'marry-me.psd',
    image: 'https://d5xh8as6wnpix.cloudfront.net/thumb/artwork/w_180,h_220/hinhtvv/artwork-templates/ac4e41c4336a485b8d3226c67d5b60dc.png',
    width: 4838,
    _id: index,
}))

const ListArtworksSimmer = () => {

    return (
        <ul className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {
                array.map((item, index) => (
                    <li key={index}
                        className="
                            p-2 rounded-lg border cursor-pointer m-4 col-span-1 bg-white
                        ">
                        <div className="w-full h-auto overflow-hidden shadow-lg flex items-start justify-start flex-col border dark:border-gray-800 rounded-lg">
                            <div
                                className="
                            flex items-center justify-center overflow-hidden
                            order-b dark:border-gray-800 relative w-full m-auto
                        "
                                style={{
                                    height: "240px",
                                }}
                            >
                                <span className='shimmer shimmer-thumbnail'></span>
                            </div>

                            <div className="p-4 w-full">
                                <div className="w-1/2"><span className='shimmer shimmer-title'></span></div>

                                <p className="py-1 text-xl line-clamp-3">
                                    <span className='shimmer shimmer-text'></span>
                                    <span className='shimmer shimmer-text'></span>
                                </p>
                                <p className="py-1 text-xl line-clamp-3">
                                    <span className='shimmer shimmer-text'></span>
                                    {" "}
                                    <span className='shimmer shimmer-text'></span>
                                    {" "}
                                    <span className='shimmer shimmer-text'></span>
                                </p>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default ListArtworksSimmer;