import { mono, sans } from "@/lib/fonts";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { Footer } from "@/components/weather/footer";
import { Header } from "@/components/weather/header";
import { JsonLd } from "@/components/json-ld";
import { Navigation } from "@/components/navigation";
import { Sidebar } from "@/components/sidebar";
import { WindowsEmojiPolyfill } from "@/components/windows-emoji-polyfill";
import { cn } from "@/lib/utils";
import { appBaseUrl } from "@/lib/env";

export const metadata: Metadata = {
  metadataBase: new URL(appBaseUrl),
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html className="scroll-smooth" lang="en" suppressHydrationWarning>
    <head>
      {/* FullCalendar styles via CDN to avoid node_modules CSS resolution issues */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@6.1.15/main.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@fullcalendar/timegrid@6.1.15/main.min.css"
      />
    </head>
    <body
      className={cn(
        sans.variable,
        mono.variable,
        "font-sans leading-relaxed antialiased"
      )}
      suppressHydrationWarning
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
        enableSystem
      >
        {/* <Header /> */}
        <div className="grid">
          {/* <Sidebar /> */}
          <div className="">
            <div className="">
              {children}
              {/* <Footer /> */}
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
