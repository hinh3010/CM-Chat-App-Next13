'use client'

import { useDispatch, useSelector } from "react-redux";
import { artworkDetailActions, artworkDetailSelector } from "~/stores/reducers/artworkDetail.reducer";

const ListLayersShimmer = () => {
    const { artworkLayers, selectLayerIds } = useSelector(artworkDetailSelector)
    const dispatch = useDispatch()

    // const [loading, setLoading] = useState(true);
    // const [imageErr, setImageErr] = useState(false)

    const handleClickLayerItem = (id) => {
        id && dispatch(artworkDetailActions.selectLayerIds([id]))
    }

    return (
        <div className="w-full scrollbar-container border rounded-2xl p-4 flex flex-col bg-white">
            <span
                className="text-3xl font-medium cursor-pointer text-center py-4"
            >
                Layers
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
                            <div className="w-full h-[40px]">
                                <span className='shimmer shimmer-thumbnail'></span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default ListLayersShimmer;