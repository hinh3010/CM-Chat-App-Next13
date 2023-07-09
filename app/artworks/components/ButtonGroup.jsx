import React, { useMemo } from "react";
import Tooltip from "./Tooltip";

export default function ButtonGroup({
    buttons,
    className,
    onClick,
    ...rest
}) {
    const lastIndex = useMemo(() => {
        return buttons.length - 1;
    }, [buttons]);

    return (
        <div
            className={"flex h-[34px] rounded-md shadow-sm " + className}
            role="group"
            {...rest}
        >
            {buttons?.map((item, index) => (
                <button
                    key={item.value}
                    data-tooltip-target={item.value}
                    type="button"
                    style={item.style}
                    className={`
                            text-xl font-medium 
                            hover:bg-gray-100 hover:text-blue-700 
                            dark:hover:text-white dark:hover:bg-gray-600  
                            border 
                            w-full flex items-center justify-center h-full
                            ${index === lastIndex
                            ? "rounded-r-lg"
                            : index === 0
                                ? "rounded-l-lg"
                                : ""
                        }
                            ${index === 0 ? "" : " border-l-0"}
                            ${item.active
                            ? "bg-gray-100 text-blue-700 dark:text-white dark:hover:bg-gray-600"
                            : 'border-gray-200 text-gray-900 bg-white'
                        }
                        `}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (onClick && typeof onClick === "function") onClick(item, e);
                    }}
                >
                    <Tooltip key={item.value} text={item.tooltip}>
                        {item.element}
                    </Tooltip>
                </button>
            ))}
        </div>
    );
}
