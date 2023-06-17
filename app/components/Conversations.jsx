'use client'
import { Switch } from "@headlessui/react";
import Avatar from "./ui/Avatar";
import { useState } from "react";
import Logo from "./ui/Logo";
import InputSearch from "./ui/InputSearch";

const Conversations = () => {
    const [enabled, setEnabled] = useState(true)
    return (
        <div className="w-full h-full flex flex-col pt-10 pb-20 px-8">
            {/* contact search */}
            <section className="flex flex-col items-center">
                <InputSearch />
            </section >
            <hr style={{ border: '1px solid #333', width: '100%', height: '1px', margin: '10px 0' }} />
            <section className="flex flex-col items-center">
                <section className="flex items-center mt-10">
                    <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className={`
                            ${enabled ? 'bg-blue-600' : 'bg-gray-200'} 
                            relative inline-flex h-6 w-11 items-center rounded-full
                        `}
                    >
                        <span className="sr-only">Enable notifications</span>
                        <span
                            className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                    </Switch>
                </section>
                <section className="mt-10">
                    <Avatar src={"https://source.unsplash.com/256x256"} />
                </section>
            </section>
        </div >
    );
}

export default Conversations;