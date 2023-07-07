'use client'

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { images } from "~/public/images";
import { artworkDetailActions, artworkDetailSelector } from "~/stores/reducers/artworkDetail.reducer";

const ListLayers = () => {
    const { artworkLayers, selectLayerIds } = useSelector(artworkDetailSelector)
    const dispatch = useDispatch()

    // const [loading, setLoading] = useState(true);
    // const [imageErr, setImageErr] = useState(false)

    const handleClickLayerItem = (id) => {
        id && dispatch(artworkDetailActions.selectLayerIds([id]))
    }

    return (
        <div className="w-full h-full border rounded-2xl p-4 flex flex-col bg-white">
            <span
                className="text-3xl font-medium cursor-pointer text-center py-4"
            >
                Layers ({artworkLayers.length})
            </span>
            <ul className="flex-1">
                {
                    artworkLayers.map(layer => (
                        <li
                            key={layer._id}
                            style={{ background: '#F8F9FA' }}
                            className={`
                                p-2 rounded-lg border hover:border-blue-500
                                transition-all ease-in-out cursor-pointer
                                flex items-center my-2
                                ${selectLayerIds.includes(layer._id) ? 'border-blue-700' : ''}
                            `}
                            onClick={() => handleClickLayerItem(layer._id)}
                        >
                            <Image
                                className="object-cover rounded-lg w-[40px] h-[40px] shadow-md bg-white"
                                width={40}
                                height={40}
                                src={!layer.text ? layer.src : images.logoTextLayer}
                                alt=""
                                onLoad={() => {
                                    // setLoading(false);
                                }}
                                onError={(e) => {
                                    // setImageErr(true)
                                    e.target.onerror = null
                                }}
                            />
                            <span className="ml-4 text-2xl line-clamp-1">
                                {layer.name}
                            </span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default ListLayers;