"use client";

const TextColor = ({ position, color, ...rest }) => {
    return (
        <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform={`rotate(${position === "right" ? "180" : "0"})`}
            {...rest}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.00566 12.5745H15.178L16.6992 16.4198H18.7471L13.0426 2H11.1411L5.43652 16.4198H7.48445L9.00566 12.5745ZM12.0918 4.77341L14.4174 10.6519H9.76626L12.0918 4.77341Z"
                fill="currentColor"
            />
            <rect x="1" y="18.9844" width="22.4616" height="3.32765" fill={color || "#000"} />
        </svg>
    );
};

export default TextColor;