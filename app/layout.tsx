// RootLayout.tsx
import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google"; // A fun, playful font
import { Navbar, MobileNavbar, Footer } from "./components";
import "./globals.css";

// Configure Baloo 2 with weights and a CSS variable
const baloo = Baloo_2({
  variable: "--font-baloo",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokecart",
  description:
    "Explore every Pokémon's stats and find the best Pokémon merchandise on Amazon with our curated affiliate links...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${baloo.variable} antialiased flex flex-col h-full items-center bg-gradient-to-r from-white to-yellow-100 font-baloo`}
      >
        {/* Only one navbar will show on a given viewport */}
        <Navbar />
        <MobileNavbar />
        <main className="flex-grow py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
