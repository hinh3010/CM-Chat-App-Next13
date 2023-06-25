"use client";

import Box from "@/components/Box";
import { useEffect } from "react";

const Error = ({ error, reset }) => {

    useEffect(() => {
        console.log("🚀 ~ file: _error.jsx:10 ~ useEffect ~ error:", error)
    }, [error])
    return (
        <Box className="h-full flex items-center justify-center">
            <div className="text-neutral-400">
                Something went wrong.
            </div>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </Box>
    );
}

export default Error;
