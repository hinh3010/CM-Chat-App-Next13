'use client'
import Conversations from "./Conversations";
import Navbar from "./Navbar";

const Sidebar2 = () => {
    return (
        <nav className="h-full grid grid-cols-6" style={{ width: '420px' }}>
            <section className="col-span-1">
                <Navbar />
            </section>
            <section className="col-span-5 shadow-2xl">
                <Conversations />
            </section>
        </nav>
    );
}

export default Sidebar2;