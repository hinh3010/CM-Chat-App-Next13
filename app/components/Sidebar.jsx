'use client'
import Conversations from "./Conversations";
import Navbar from "./Navbar";

const Sidebar = () => {
    return (
        <div className="h-full w-full grid grid-cols-4">
            <section className="col-span-1">
                <Navbar />
            </section>
            <section className="col-span-3 shadow-lg">
                <Conversations />
            </section>
        </div>
    );
}

export default Sidebar;