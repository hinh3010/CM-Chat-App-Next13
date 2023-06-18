'use client'
import ConversationItem from "./ConversationItem";
import InputSearch from "./ui/InputSearch";

const Conversations = () => {
    return (
        <div className="w-full h-full flex flex-col pt-10" style={{ height: '100vh', overflow: 'hidden' }}>
            {/* contact search */}
            <section className="flex flex-col items-center px-8">
                <InputSearch />
                <hr style={{ border: '1px solid #333', width: '100%', height: '1px', margin: '10px 0' }} />
            </section >
            <section className="flex flex-col px-8"
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