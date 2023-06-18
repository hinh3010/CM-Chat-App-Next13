import ChatView from "../components/ChatView";
import Header from "../components/Header";
import InputChat from "../components/InputChat";

export default function Home() {
    return (
        <main className="h-full w-full overflow-hidden">
            <section>
                <Header />
            </section>
            <section>
                <ChatView />
            </section>
            <section>
                <InputChat />
            </section>
        </main>
    )
}
