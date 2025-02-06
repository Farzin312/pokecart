import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar, Footer} from './components'
import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokecart",
  description: "Explore every Pokémon's stats and find the best Pokémon merchandise on Amazon with our curated affiliate links. Shop plushies, figures, and more—all in one place! Plus, stay tuned for our upcoming 5% cashback reward on Pokémon purchases made through our links.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-full items-center bg-gradient-to-r from-white to-yellow-100`}>
          <Navbar />
        <main className="flex-grow py-4">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
