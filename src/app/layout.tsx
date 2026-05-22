import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NavPill } from "@/components/nav-pill";
import { Footer } from "@/components/footer";

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

export const metadata: Metadata = {
  title: "Lui Sanchez — Data engineer & analytics builder",
  description:
    "I build the data and automation systems that turn messy operations into scalable decisions. Selected work, case studies, and how to reach me.",
  metadataBase: new URL("https://luissanchez.io"),
  openGraph: {
    title: "Lui Sanchez — Data engineer & analytics builder",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
