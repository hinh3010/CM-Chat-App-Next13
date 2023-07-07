import { Inter } from "next/font/google";
import Sidebar2 from "../components/Sidebar2";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Messages",
    description: "Messages",
    generator: "Messages",
    applicationName: "Messages",
    referrer: "origin-when-cross-origin",
    keywords: ["Messages", "Hello cac ban tre"],
    authors: [{ name: "hinh3010" }, { name: "Hello cac ban tre" }],
    colorScheme: "dark",
    creator: "hinh3010",
    publisher: "hinh3010",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "Messages",
        description: "The React Framework for the Web",
        url: "https://adu",
        siteName: "Messages",
        images: [
            {
                url: "https://adu/og.png",
                width: 800,
                height: 600,
            },
            {
                url: "https://adu/og-alt.png",
                width: 1800,
                height: 1600,
                alt: "My custom alt",
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="h-full scroll-smooth antialiased">
            <body
                className={inter.className + ' ' + 'shadow-2xl'}
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    height: "100vh",
                }}
            >
                <div
                    className="h-full w-full flex"
                >
                    <section>
                        <Sidebar2 />
                    </section>
                    <section className="flex-1">
                        {children}
                    </section>
                </div>
            </body>
        </html>
    );
}
