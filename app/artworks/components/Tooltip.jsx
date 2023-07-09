
const Tooltip = ({ text, children, bottom = '120%', left = '50%', style }) => {

    return (
        <div className="tooltip-container w-full h-full flex items-center justify-center" >
            {children}
            <div
                className="tooltip"
                style={{ bottom: bottom, left: left, ...style }}
            >
                {text}
            </div>
        </div>
    );
};

export default Tooltip;
