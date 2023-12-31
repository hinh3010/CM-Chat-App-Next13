'use client'
import Conversations from "./Conversations";
import Navbar from "./Navbar";

const Sidebar = () => {
    return (
        <div className="h-full w-full grid grid-cols-5">
            <section className="col-span-1">
                <Navbar />
            </section>
            <section className="col-span-4 shadow-2xl">
                <Conversations />
            </section>
        </div>
    );
}

export default Sidebar;