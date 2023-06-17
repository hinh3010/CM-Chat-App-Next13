import Navbar from "./Navbar";

const Sidebar = () => {
    return (
        <div className="h-full w-full grid grid-cols-4">
            <section className="bg-red-400 col-span-1">
                <Navbar />
            </section>
            <section className="col-span-3">
                adu2
            </section>
        </div>
    );
}

export default Sidebar;