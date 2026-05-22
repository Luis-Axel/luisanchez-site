import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NavPill } from "@/components/nav-pill";
import { Footer } from "@/components/footer";

// Outfit: warm geometric sans — closest free analogue to Acorn (Indian Type
// Foundry), the display face used on benshih.design. Powers `font-display`.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Caveat: handwritten script for small annotations (e.g. the hero
// hover-state caption "in case you got tired of reading"). Drives `font-hand`.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luis Sanchez — Data engineer & analytics builder",
  description:
    "I build the data and automation systems that turn messy operations into scalable decisions. Selected work, case studies, and how to reach me.",
  metadataBase: new URL("https://luissanchez.io"),
  openGraph: {
    title: "Luis Sanchez — Data engineer & analytics builder",
    description:
      "I build the data and automation systems that turn messy operations into scalable decisions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-theme="dark" pre-set so first paint matches CSS default (dark);
    // ThemeProvider will reconcile to the stored / system preference on mount.
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${outfit.variable} ${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <NavPill />
          <main className="flex-1 pt-24 md:pt-28">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
