import Canvas from "../components/Canvas";
import Customize from "../components/Customize";
import ListLayers from "../components/ListLayers";

export default function PageDetail() {
    return (
        <main
            className="h-full w-full shadow-lg grid grid-cols-4"
        >
            <section
                className="w-full h-full col-span-1  p-2"
            >
                <ListLayers />
            </section>
            <section
                className="w-full h-full col-span-2 p-2"
            >
                <Canvas />
            </section>
            <section
                className="w-full h-full col-span-1 p-2"
            >
                <Customize />
            </section>
        </main>
    )
}
