"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-white to-yellow-100 py-4 mt-8 border-t border-yellow-300">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-gray-700">
          © {new Date().getFullYear()} Pokecart. All rights reserved.
        </p>
        <div className="mt-2 flex justify-center space-x-4">
          <Link href="/about" className="text-blue-600 hover:underline">
            About Us
          </Link>
          <Link href="/contact" className="text-blue-600 hover:underline">
            Contact
          </Link>
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
