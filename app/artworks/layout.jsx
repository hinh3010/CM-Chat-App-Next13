import { Inter } from "next/font/google";
import Header from "./components/Header";
import './styles.scss'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Artworks",
    description: "Artworks",
    generator: "Artworks",
    applicationName: "Artworks",
    referrer: "origin-when-cross-origin",
    keywords: ["Artworks", "Hello cac ban tre"],
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
        title: "Artworks",
        description: "The React Framework for the Web",
        url: "https://adu",
        siteName: "Artworks",
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
                className={inter.className}
                style={{
                    maxWidth: "1600px",
                    margin: "0 auto",
                    height: "100vh",
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <section className="w-full px-2">
                    <Header />
                </section>
                <section className="w-full flex-1">
                    {children}
                </section>
            </body>
        </html>
    );
}
