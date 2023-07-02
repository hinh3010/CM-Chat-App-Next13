'use client'
import CanvasWrapper from "../components/CanvasWrapper";
import Customize from "../components/Customize";
import ListLayers from "../components/ListLayers";

function PageDetail() {
    return (
        <main
            className="h-full w-full grid grid-cols-4"
        >
            <section
                className="w-full h-full col-span-1 p-2"
            >
                <ListLayers />
            </section>
            <section
                className="w-full h-full col-span-2 p-2"
            >
                <CanvasWrapper />
            </section>
            <section
                className="w-full h-full col-span-1 p-2"
            >
                <Customize />
            </section>
        </main>
    )
}

export default PageDetail
