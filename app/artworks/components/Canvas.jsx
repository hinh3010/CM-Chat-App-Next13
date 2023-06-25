'use client'

const Canvas = () => {
    return (
        <div className="w-full h-full border flex flex-col bg-white rounded-2xl">
            <div className="w-full h-14">

            </div>
            <div
                className="flex-1"
                style={{
                    background: `linear-gradient(  115deg, transparent 75%,  rgba(255, 255, 255, 0.8) 75%  )  0 0,
                                    linear-gradient(245deg, transparent 75%, rgba(255, 255, 255, 0.8) 75%)   0 0,
                                    linear-gradient(115deg, transparent 75%, rgba(255, 255, 255, 0.8) 75%)   7px -15px,
                                    linear-gradient(245deg, transparent 75%, rgba(255, 255, 255, 0.8) 75%)   7px -15px,  #f0f0f0`,
                    backgroundSize: ' 15px 30px',
                }
                }
            >
                <span
                    className="text-3xl font-medium cursor-pointer"
                >
                    Canvas
                </span>
            </div >
            <div className="w-full h-20">

            </div>
        </div >
    );
}

export default Canvas;