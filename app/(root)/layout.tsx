import { mono, sans } from "@/lib/fonts";
import "./weather.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { Footer } from "@/components/weather/footer";
import { Header } from "@/components/weather/header";
import { JsonLd } from "@/components/json-ld";
// import { Sidebar } from "@/components/sidebar";
import { WindowsEmojiPolyfill } from "@/components/windows-emoji-polyfill";
import { cn } from "@/lib/utils";
import { appBaseUrl } from "@/lib/env";

export const metadata: Metadata = {
  metadataBase: new URL(appBaseUrl),
};

type RootLayoutProps = {
  children: ReactNode;
};

const HomeRootLayout = ({ children }: RootLayoutProps) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default HomeRootLayout;
