'use client'
import { Switch } from "@headlessui/react";
import Avatar from "./ui/Avatar";
import { useState } from "react";
import Logo from "./ui/Logo";
import Messenger from "./ui/Messenger";

const Navbar = () => {
    const [enabled, setEnabled] = useState(true)
    return (
        <div className="w-full h-full flex flex-col items-center justify-between pt-10 pb-20" style={{}} >
            <section className="flex flex-col items-center">
                <section className="mb-10">
                    <Logo />
                </section>
                <section className="mb-10">
                    <Messenger />
                </section>
                <section>
                    adu2
                </section>
                <section>
                    adu2
                </section>
                <section>
                    adu2
                </section>
            </section>
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
        </div>
    );
}

export default Navbar;