'use client'
import ConversationItem from "./ConversationItem";
import InputSearch from "./ui/InputSearch";

const Conversations = () => {
    return (
        <div className="w-full h-full flex flex-col pt-10" style={{ height: '100vh', overflow: 'hidden' }}>
            {/* contact search */}
            <section className="flex flex-col items-center px-8">
                <InputSearch />
                <hr className="opacity-50 my-4" style={{ borderTop: '1px solid #333', width: '100%', height: '1px' }} />
            </section >
            <section className="flex flex-col px-4 -mt-2 scrollbar-none"
                style={{
                    overflow: 'overlay'
                }}
            >

                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
                <ConversationItem />
            </section>
        </div >
    );
}

export default Conversations;