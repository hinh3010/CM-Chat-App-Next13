"use client";

import "./inputSearch.scss";

function InputSearch({ className, ...rest }) {
    return (
        <form className={"flex items-center " + className} {...rest}>
            <label htmlFor="voice-search" className="sr-only">
                Search
            </label>
            <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                        className="w-8 h-8 text-gray-500 dark:text-gray-400"
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
                    id="voice-search"
                    className="
                        border border-blue-500  text-3xl 
                        rounded-2xl w-full pl-12 pr-10 py-3
                    "
                    placeholder="Search here..."
                    style={{
                        backgroundColor: '#EAF2FE',
                        color: '#709CE6',
                    }}
                    required
                />
                <button
                    type="button"
                    className="flex absolute inset-y-0 right-0 items-center pr-3"
                >
                    <svg
                        className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>
        </form>
    );
}

export default InputSearch;
