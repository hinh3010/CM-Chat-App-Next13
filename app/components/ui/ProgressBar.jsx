import React, { useState, useEffect } from "react";

function ProgressBar({ value, className }) {
    const [width, setWidth] = useState(45);

    useEffect(() => {
        setWidth(value);
    }, [value]);

    return (
        <div
            className={"shimmer w-full bg-gray-200 rounded-full dark:bg-gray-700 " + className}
            style={{ height: "10px" }}
        >
        </div>
    );
}

export default ProgressBar;
