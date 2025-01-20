import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CCLgMenu, CCSmallMenu } from "./ui/adaptiveMenu";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  authors: {name: "Cal Woods"},
  title: "CodeClub: Home",
  description: "A previously made clone of the Codeclub website project from CA1 of the Web Applications Development module, that has been upgraded to the nextJS framework.",
  keywords: "codeclub, web app dev, web applications development, computing, year 2"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased max-h-[4000px] h-[800px] sm:bg-blue-900 md:bg-orange-500 bg-green-600 lg:bg-cyan-900`}>
        <Image alt="The codeclub logo" className="block float-left mb-[20px]" src="/Images/code_club_logo.jpg" width={50} height={50} />
        <CCSmallMenu />
        <CCLgMenu />
        {children}
      </body>
    </html>
  );
}
