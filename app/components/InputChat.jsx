"use client";
import Logo from "./ui/Logo";

const InputChat = () => {
    return (
        <div className="h-36 w-full flex items-center justify-between px-10 py-8 shadow-2xl">
            <input
                type="text"
                className={`
                    flex-1 mr-10 h-20 bg-gray-50 border border-gray-300 
                    text-gray-900 text-3xl rounded-2xl focus:ring-blue-500
                    focus:border-blue-500 block pl-12 pr-10 py-3  dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500
                `}
                placeholder="Search here..."
            />
            <Logo />
        </div>
    );
};

export default InputChat;
