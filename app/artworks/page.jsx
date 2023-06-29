import FilterArtworks from "./components/FilterArtworks";
import ListArtworks from "./components/ListArtworks";

export default function Page() {
    return (
        <main className="w-full h-full border rounded-2xl p-2 bg-white">
            <FilterArtworks />
            <ListArtworks />
        </main>
    )
}