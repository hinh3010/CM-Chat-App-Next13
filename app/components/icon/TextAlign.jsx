"use client";

const TextAlign = ({ position, ...rest }) => {
    if (position === 'center') {
        return (
            <svg
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...rest}
            >
                <g clipPath="url(#clip0_15794_138308)">
                    <path
                        d="M7 15V17H17V15H7ZM3 21H21V19H3V21ZM3 13H21V11H3V13ZM7 7V9H17V7H7ZM3 3V5H21V3H3Z"
                        fill="currentColor"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_15794_138308">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        );
    }

    return (
        <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform={`rotate(${position === 'right' ? '180' : '0'})`}
            {...rest}
        >
            <g clipPath="url(#clip0_15794_138306)">
                <path
                    d="M15 15H3V17H15V15ZM15 7H3V9H15V7ZM3 13H21V11H3V13ZM3 21H21V19H3V21ZM3 3V5H21V3H3Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_15794_138306">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default TextAlign;
