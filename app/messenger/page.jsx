import ChatView from "@/components/ChatView";
import Header from "@/components/Header";
import InputChat from "@/components/InputChat";

export default function Home() {
    return (
        <main className="h-full w-full shadow-lg flex flex-col">
            <section >
                <Header />
            </section>
            <section className="border-2" style={{ overflow: 'overlay' }} >
                <ChatView />
            </section>
            <section>
                <InputChat />
            </section>
        </main>
    )
}
