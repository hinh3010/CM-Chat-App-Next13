"use client";

import moment from "moment";

const data = [
    {
        userId: 1,
        message: "adu adu adu adu adu adu adu adu adu adu",
        attachment: null,
        createdAt: Date.now(),
    },
    {
        userId: 1,
        message: "adu adu adu adu adu adu adu adu adu adu",
        attachment: null,
        createdAt: Date.now(),
    },
    {
        userId: 2,
        message: "adu adu adu adu adu adu adu adu adu adu",
        attachment: {
            fileUrl: "",
            fileType: "image",
        },
        createdAt: Date.now(),
    },
    {
        userId: 1,
        message: "adu adu adu adu adu adu adu adu adu adu",
        attachment: null,
        createdAt: Date.now(),
    },
    {
        userId: 1,
        message: "adu adu adu adu adu adu adu adu adu adu",
        attachment: null,
        createdAt: Date.now(),
    },
    {
        userId: 2,
        message: "adu adu adu adu adu adu adu adu adu adu",
        attachment: {
            fileUrl: "",
            fileType: "image",
        },
        createdAt: Date.now(),
    },
    {
        userId: 1,
        message: "adu adu adu adu adu adu adu adu adu adu",
        attachment: null,
        createdAt: Date.now(),
    },
    {
        userId: 1,
        message: "adu adu adu adu adu adu adu adu adu adu",
        attachment: null,
        createdAt: Date.now(),
    },
    {
        userId: 2,
        message: "adu adu adu adu adu adu adu adu adu adu",
        attachment: {
            fileUrl: "",
            fileType: "image",
        },
        createdAt: Date.now(),
    },
    {
        userId: 1,
        message: "adu adu adu adu adu adu adu adu adu adu",
        attachment: null,
        createdAt: Date.now(),
    },
    {
        userId: 1,
        message: "adu adu adu adu adu adu adu adu adu adu",
        attachment: null,
        createdAt: Date.now(),
    },
    {
        userId: 2,
        message: "adu adu adu adu adu adu adu adu adu adu",
        attachment: {
            fileUrl: "",
            fileType: "image",
        },
        createdAt: Date.now(),
    },
    {
        userId: 1,
        message: "adu adu adu adu adu adu adu adu adu adu",
        attachment: null,
        createdAt: Date.now(),
    },
    {
        userId: 2,
        message: "adu adu adu adu adu adu adu adu adu adu",
        attachment: {
            fileUrl: "",
            fileType: "image",
        },
        createdAt: Date.now(),
    },
];

const ChatView = () => {
    return (
        <div className="w-full p-10">
            <section
                className="rounded-3xl mt-2 py-4 px-6"
                style={{
                    backgroundColor: '#FFFFFF',
                    maxWidth: "40%",
                    marginRight: 'auto'
                }}
            >
                <span
                    style={{
                        fontSize: "1.4rem",
                        fontWeight: '500',
                        lineHeight: '1.8rem',
                        color: '#696969'
                    }}
                >
                    adu adu adu adu adu adu adu adu adu adu
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Culpa enim distinctio mollitia facere fuga laboriosam.
                    Possimus est iusto ex fugit atque doloremque consequatur
                    quas nesciunt voluptatem. Ut minima hic ad.
                </span>
                <p
                    style={{
                        fontSize: "1rem",
                        fontWeight: '400',
                        lineHeight: '1.5rem',
                        color: '#696969',
                        textAlign: 'end'
                    }}
                >
                    09:20
                </p>
            </section>
            {
                data.map((chat, i) => (
                    <section
                        key={i}
                        className="rounded-3xl mt-2 py-4 px-6"
                        style={{
                            backgroundColor: chat.userId === 1 ? '#5B96F7' : '#FFFFFF',
                            maxWidth: "40%",
                            marginLeft: chat.userId === 1 ? 'auto' : 0,
                            marginRight: chat.userId === 2 ? 'auto' : 0,
                        }}
                    >
                        <span
                            style={{
                                fontSize: "1.4rem",
                                fontWeight: '500',
                                lineHeight: '1.8rem',
                                color: chat.userId === 1 ? '#FFFFFF' : '#696969'
                            }}
                        >
                            {
                                chat.message
                            }
                        </span>
                        <p
                            style={{
                                fontSize: "1rem",
                                fontWeight: '400',
                                lineHeight: '1.5rem',
                                color: chat.userId === 1 ? '#FFFFFF' : '#696969',
                                textAlign: 'end'
                            }}
                        >
                            {
                                moment(chat.createdAt).format('hh:mm')
                            }
                        </p>
                    </section>
                ))
            }
        </div>
    );
};

export default ChatView;
