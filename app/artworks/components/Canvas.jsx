'use client'

// import { useCallback, useEffect, useRef } from "react";

const Canvas = () => {
    // const workerRef = useRef(null)
    // useEffect(() => {
    //     workerRef.current = new Worker(new URL('../helper/worker.js', import.meta.url), {
    //         type: "module",
    //     })
    //     workerRef.current.onmessage = (event) =>
    //         alert(`WebWorker Response => ${event.data}`)
    //     return () => {
    //         workerRef.current?.terminate()
    //     }
    // }, [])

    // const handleWork = useCallback(async () => {
    //     workerRef.current?.postMessage('adu');
    // }, []);
    return (
        <div className="w-full h-full border flex flex-col bg-white rounded-2xl">
            <div className="w-full h-14">

            </div>
            <div
                className="flex-1"
                style={{
                    background: `
                        linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white),
                        linear-gradient(45deg, white 25%, rgb(218, 218, 218) 25%, rgb(218, 218, 218) 75%, white 75%, white)
                    `,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 10px 10px'
                }}
            // onClick={() => {
            //     console.log('onClick')
            //     handleWork()
            // }}
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