"use client";

const data = [
    {
        userId: 1,
        message: "adu adu adu adu adu adu adu adu adu adu",
        attachment: null,
    },
    {
        userId: 1,
        message: "adu adu adu adu adu adu adu adu adu adu",
        attachment: null,
    },
    {
        userId: 2,
        message: "adu adu adu adu adu adu adu adu adu adu",
        attachment: {
            fileUrl: "",
            fileType: "image",
        },
    },
];

const ChatView = () => {
    return (
        <div className="h-full w-full p-10 flex flex-col">
            <section
                className="rounded-3xl"
                style={{
                    backgroundColor: '#5B96F7',
                    maxWidth: "40%",
                    padding: '10px 15px',
                    marginTop: '1.6rem',
                    marginRight: 'auto'
                }}
            >
                <span
                    style={{
                        fontSize: "1.4rem",
                        fontWeight: '600',
                        lineHeight: '1.8rem',
                        color: '#FFFFFF'
                    }}
                >
                    adu adu adu adu adu adu adu adu adu adu
                </span>
            </section>
            {
                data.map((chat, i) => (
                    <section
                        key={i}
                        className="rounded-3xl"
                        style={{
                            backgroundColor: '#5B96F7',
                            maxWidth: "40%",
                            padding: '10px 15px',
                            marginTop: '1.6rem',
                            marginLeft: chat.userId === 1 ? 'auto' : 0,
                            marginRight: chat.userId === 2 ? 'auto' : 0,
                        }}
                    >
                        <span
                            style={{
                                fontSize: "1.4rem",
                                fontWeight: '600',
                                lineHeight: '1.8rem',
                                color: '#FFFFFF'
                            }}
                        >
                            {
                                chat.message
                            }
                        </span>
                    </section>
                ))
            }
        </div>
    );
};

export default ChatView;
