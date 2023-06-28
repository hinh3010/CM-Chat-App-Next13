import { Provider } from 'react-redux';
import store, { wrapper } from "~/stores";
import Canvas from "../components/Canvas";
import Customize from "../components/Customize";
import ListLayers from "../components/ListLayers";

function PageDetail() {
    return (
        <Provider store={store}>
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
        </Provider>
    )
}

export default wrapper.withRedux(PageDetail)
