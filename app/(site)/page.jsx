import ChatView from "../components/ChatView";
import Header from "../components/Header";
import InputChat from "../components/InputChat";

export default function Home() {
    return (
        <main className="h-full w-full overflow-hidden shadow-lg flex flex-col">
            <section >
                <Header />
            </section>
            <section className="flex-1 border-2">
                <ChatView />
            </section>
            <section>
                <InputChat />
            </section>
        </main>
    )
}
