"use client";

const Arrow = ({ rotate, ...rest }) => {
    return (
        <svg
            className="h-8 w-8"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform={`rotate(${rotate || '0'})`}
            {...rest}
        >
            <g clipPath="url(#clip0_18479_149158)">
                <path
                    d="M11.8334 16V13H21.8334V11L11.8334 11V8L7.83337 12L11.8334 16ZM3.83337 20H5.83337L5.83337 4H3.83337L3.83337 20Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_18479_149158">
                    <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="matrix(0 -1 1 0 0.833374 24)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

export default Arrow;