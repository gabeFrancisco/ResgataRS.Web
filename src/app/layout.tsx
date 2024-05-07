import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import Main from "@/components/Main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resgate RS",
  description:
    "Peça ajuda ou ajude alguém em meio a esse caos climático em que se encontra nosso amadao estado!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="bg-white overflow-x-hidden">
        <Main>{children}</Main>
      </body>
    </html>
  );
}
