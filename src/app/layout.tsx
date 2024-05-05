import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Mapa from "@/components/Mapa";

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
      <body className={inter.className}>
        <Header />
        <main className="flex flex-col lg:flex-row min-h-screen justify-between p-3">
          <Mapa />
          <div className="p-3 my-2 mx-0 lg:mx-3 lg:my-0 border rounded h-full w-full lg:w-1/2 text-gray-800 shadow">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
