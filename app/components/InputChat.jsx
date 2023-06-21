"use client";
import Logo from "./ui/Logo";

const InputChat = () => {
    return (
        <div className="h-28 w-full flex items-center justify-between px-10 shadow-2xl">
            <div className="relative flex-1 mr-10">
                <div className="flex absolute inset-y-0 left-8 items-center pointer-events-none">
                    <svg
                        className="w-12 h-12 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>
                <input
                    type="text"
                    className={`
                        h-20 bg-gray-50 border border-gray-300 w-full
                        text-gray-900 text-3xl rounded-2xl focus:ring-blue-500
                        focus:border-blue-500 block pl-20 pr-10 py-3 
                    `}
                    placeholder="Search here..."
                />
            </div>
            <Logo style={{ width: '50px', height: '50px' }} />
        </div>
    );
};

export default InputChat;
