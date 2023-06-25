'use client'

const Customize = () => {
    return (
        <div className="w-full h-full border rounded-2xl p-4 flex flex-col bg-white">
            <section className="flex items-end justify-between py-4">
                <span
                    className="text-3xl font-medium cursor-pointer"
                >
                    Customize
                </span>
                <span
                    className="text-2xl font-medium cursor-pointer"
                    style={{ color: '#007BFF' }}
                >
                    Close
                </span>
            </section>
            <section className="flex flex-col mt-2">
                <span
                    className="text-2xl  font-medium cursor-pointer"
                >
                    Layer Name
                </span>
                <input
                    type="text"
                    id="voice-search"
                    className="
                        border text-2xl px-4 py-4 w-full
                        border-blue-500 rounded-lg mt-2
                    "
                    style={{
                        // backgroundColor: '#EAF2FE',
                        // color: '#709CE6',
                        backgroundColor: 'transparent',
                    }}
                />
            </section>
            <section className="flex flex-col mt-6">
                <span
                    className="text-2xl font-medium cursor-pointer"
                >
                    Layer Name
                </span>
                <input
                    type="text"
                    id="voice-search"
                    className="
                        border text-2xl px-4 py-4 w-full
                        border-blue-500 rounded-lg mt-2
                    "
                    style={{
                        backgroundColor: 'transparent',
                    }}
                />
            </section>
            <section className="flex flex-col mt-6">
                <span
                    className="text-2xl font-medium cursor-pointer"
                >
                    Text alignment
                </span>
                <input
                    type="text"
                    id="voice-search"
                    className="
                        border text-2xl px-4 py-4 w-full
                        border-blue-500 rounded-lg mt-2
                    "
                    style={{
                        backgroundColor: 'transparent',
                    }}
                />
            </section>
            <section className="flex flex-col mt-6">
                <span
                    className="text-2xl font-medium cursor-pointer"
                >
                    Location
                </span>
                <input
                    type="text"
                    id="voice-search"
                    className="
                        border text-2xl px-4 py-4 w-full
                        border-blue-500 rounded-lg mt-2
                    "
                    style={{
                        backgroundColor: 'transparent',
                    }}
                />
            </section>
            <section className="flex flex-col mt-6">
                <span
                    className="text-2xl font-medium cursor-pointer"
                >
                    Layer size
                </span>
                <input
                    type="text"
                    id="voice-search"
                    className="
                        border text-2xl px-4 py-4 w-full
                        border-blue-500 rounded-lg mt-2
                    "
                    style={{
                        backgroundColor: 'transparent',
                    }}
                />
            </section>
        </div>
    );
}

export default Customize;