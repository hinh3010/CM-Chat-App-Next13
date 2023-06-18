import { Inter } from 'next/font/google'
import styles from './styles.scss'
import Sidebar from '../components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Messages',
  description: 'Messages',
  generator: 'Messages',
  applicationName: 'Messages',
  referrer: 'origin-when-cross-origin',
  keywords: ['Messages', 'Hello cac ban tre'],
  authors: [{ name: 'hinh3010' }, { name: 'Hello cac ban tre' }],
  colorScheme: 'dark',
  creator: 'hinh3010',
  publisher: 'hinh3010',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Messages',
    description: 'The React Framework for the Web',
    url: 'https://adu',
    siteName: 'Messages',
    images: [
      {
        url: 'https://adu/og.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://adu/og-alt.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='h-full scroll-smooth antialiased'>
      <body className={inter.className + ' ' + 'h-full'}>
        <div className='w-full grid grid-cols-3 overflow-hidden' style={{ height: '100vh' }}>
          <section className='w-full h-full col-span-1'>
            <Sidebar />
          </section>
          <section className='w-full h-full col-span-2 bg-slate-400'>
            {children}
          </section>
        </div>
      </body>
    </html>
  )
}
