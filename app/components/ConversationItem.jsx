'use client'
import Avatar from "./ui/Avatar";

const ConversationItem = () => {
    return (
        <div
            className="my-2 flex items-start justify-between shadow-xl rounded-xl py-4 px-6 cursor-pointer"
            style={{
                backgroundColor: '#fcfdff'
            }}
        >
            <div className="flex items-center">
                <Avatar src={"https://source.unsplash.com/256x256"} />
                <div
                    className="flex flex-col ml-4"
                    style={{
                        color: '#686768'
                    }}
                >
                    <span
                        style={{
                            fontWeight: '800',
                            fontSize: '1.6rem',
                            lineHeight: '22px'
                        }}
                    >
                        Adu Adu
                    </span>
                    <span
                        style={{
                            fontWeight: '600',
                            fontSize: '1.4rem',
                            lineHeight: '20px'
                        }}
                    >
                        Adu Adu
                    </span>
                </div>
            </div>
            <span
                style={{
                    fontWeight: '500',
                    fontSize: '1.2rem',
                    lineHeight: '16px'
                }}
            >
                9:36
            </span>
        </div>
    );
}

export default ConversationItem;