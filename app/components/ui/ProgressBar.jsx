import React, { useState, useEffect } from "react";

function ProgressBar({ value }) {
    const [width, setWidth] = useState(45);

    useEffect(() => {
        setWidth(value);
    }, [value]);

    return (
        <div
            className="shimmer w-full bg-gray-200 rounded-full h-4 mt-8 dark:bg-gray-700"
            style={{ height: "10px" }}
        >
            {/* <div
                className="bg-green-600 h-4 rounded-full dark:bg-gray-300 progress-bar-animated"
                style={{ width: `${width}%`, transition: "width 2s" }}
            ></div> */}
        </div>
    );
}

export default ProgressBar;
