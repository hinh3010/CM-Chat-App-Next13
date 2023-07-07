import InputSearch from "~/app/components/ui/InputSearch";

const FilterArtworks = () => {
    return (
        <div className="flex p-8 items-center justify-between">
            <section>
                <InputSearch />
            </section>
            <InputSearch />
            <section className="flex items-center text-2xl font-medium">
                <span className="mr-4">Sort by</span>
                <InputSearch />
            </section>
        </div>
    );
}

export default FilterArtworks;