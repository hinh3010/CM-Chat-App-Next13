const Box = ({ children, classes }) => {
    return (
        <div
            className={
                `
                    bg-neutral-900 
                    rounded-lg 
                    h-fit 
                    w-full
                    ${classes}
`
            }>
            {children}
        </div>
    );
}

export default Box;