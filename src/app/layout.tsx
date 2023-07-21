import './globals.css';
import Navigation from '@/components/Navigation';
import clsx from 'clsx';
import localFont from 'next/font/local';

const kaiseiTokumin = localFont({
  src: '../../public/fonts/kaisei-tokumin-latin-700-normal.woff2',
  weight: '700',
  variable: '--font-kaisei',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'abjt . web developer . digital artist',
    template: '%s | abjt . web developer . digital artist'
  },
  description: 'Crafting engaging experiences for the internet.',
  openGraph: {
    title: 'abjt . web developer . digital artist',
    description: 'Crafting engaging experiences for the internet.',
    url: 'https://abjt.dev/',
    locale: 'en_IE',
    type: 'website',
    images: [
      {
        url: 'https://abjt.dev/images/og-image.jpg',
        alt: 'abjt . web developer . digital artist',
        width: 1440,
        height: 820,
      },
    ],
  },
  twitter: {
    title: 'abjt . web developer . digital artist',
    description: 'Crafting engaging experiences for the internet.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx(
      "antialiased bg-black font-sans text-neutral-50",
      "after:content-[''] after:fixed after:top-0 after:left-0 after:w-screen after:h-screen after:pointer-events-none after:z-50 after:bg-orange-100 after:bg-opacity-[.075] after:transition-opacity after:duration-300",
      kaiseiTokumin.variable
    )}>
      <body>
        <div className="min-h-screen flex gap-24 max-w-screen-xl 2xl:max-w-screen-xl [&>section]:min-w-0 [&>section]:max-w-screen-md 2xl:[&>section]:max-w-screen-xl m-auto py-4 px-4 flex-col relative sm:flex-row sm:pt-0 sm:pb-0 sm:px-8 md:px-16 sm:gap-6">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  )
}
