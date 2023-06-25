"use client";

import React from "react";

function Modal({ onCancel, onOk, title, children }) {
    return (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                    className="
                        flex min-h-full items-end justify-center p-4 
                        text-center sm:items-center sm:p-0
                    "
                >
                    <div
                        className="
                            relative transform overflow-hidden rounded-lg 
                            bg-white text-left shadow-xl 
                            transition-all sm:my-8 sm:max-w-7xl
                        "
                    >
                        {
                            title &&
                            <div className="text-blue-700 bg-gray-50 px-6 py-5 text-start text-2xl font-semibold">
                                {title}
                            </div>
                        }
                        <div className="bg-white p-8 pb-6">
                            {children}
                        </div>
                        <div className="bg-gray-50 px-6 py-4 sm:flex sm:justify-end sm:px-8 sm:py-5">
                            <button
                                type="button"
                                className="
                                    inline-flex w-full justify-center rounded-md bg-white px-5 py-2
                                    font-semibold text-gray-900 shadow-sm ring-1 ring-inset 
                                    ring-gray-300 hover:bg-gray-50 text-2xl
                                    sm:w-auto 
                                "
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="
                                    inline-flex w-full justify-center rounded-md bg-blue-600 px-5 py-2
                                    font-semibold text-white shadow-sm hover:bg-blue-500 text-2xl
                                    sm:ml-3 sm:w-auto mt-2 sm:mt-0
                                "
                                onClick={onOk}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
