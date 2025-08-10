import { mono, sans } from '@/lib/fonts';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { JsonLd } from '@/components/json-ld';
import { Navigation } from '@/components/navigation';
import { Sidebar } from '@/components/sidebar';
import { WindowsEmojiPolyfill } from '@/components/windows-emoji-polyfill';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL as string),
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html className="scroll-smooth" lang="en" suppressHydrationWarning>
    <body
      className={cn(
        sans.variable,
        mono.variable,
        'font-sans leading-relaxed antialiased'
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
        enableSystem
      >
        <Header />
        <div className="grid">
          <Sidebar />
          <div className="py-8 pr-4 pl-4 sm:py-16">
            <div className="prose mx-auto w-full">
              {children}
              <Footer />
            </div>
          </div>
        </div>
        <Toaster />
        <WindowsEmojiPolyfill />
        <JsonLd />
        <Analytics />
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
