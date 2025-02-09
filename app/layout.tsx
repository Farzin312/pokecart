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
        className={`${baloo.variable} antialiased flex flex-col h-full items-center bg-gradient-to-r from-white to-yellow-100 font-baloo overflow-x-hidden`}
      >
        {/* Only one navbar will show on a given viewport */}
        <div>
        <div className="hidden sm:block">
          <Navbar />
        </div>
        <div className="block sm:hidden">
          <MobileNavbar />
        </div>
      </div>
          <main className="flex-grow py-10 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
