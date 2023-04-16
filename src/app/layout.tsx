import './globals.css';
import Navigation from '@/components/Navigation';
import { Kaisei_Tokumin } from 'next/font/google';
import clsx from 'clsx';

const kaiseiTokumin = Kaisei_Tokumin({
  weight: '700',
  variable: '--font-kaisei',
  display: 'swap',
  subsets: ['latin'],
  style: ['normal']
});

export const metadata = {
  title: 'abjt . web developer . digital artist',
  description: 'Crafting engaging experiences for the internet.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx(
      "antialiased bg-black font-sans text-neutral-50",
      "after:content-[''] after:fixed after:top-0 after:left-0 after:w-screen after:h-screen after:pointer-events-none after:z-50 after:bg-orange-100 after:bg-opacity-[.075]",
      kaiseiTokumin.variable
    )}>
      <body>
        <div className="min-h-screen flex gap-24 max-w-screen-xl m-auto py-4 px-4 flex-col relative sm:flex-row sm:pt-0 sm:pb-0 sm:px-16 sm:gap-6">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  )
}
