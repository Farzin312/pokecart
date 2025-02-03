'use client'

import Link from 'next/link'
import { Button } from './reusable'

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-yellow-300 to-gray-50 text-gray-700 opacity-90 py-6 px-4 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Logo & About */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-semibold">PokéCart</h2>
          <p className="text-sm">Your #1 store for all Pokémon collectibles and merchandise.</p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="flex space-x-6">
          <Link href="/about">
            <span className="hover:text-yellow-500 transition">About Us</span>
          </Link>
          <Link href="/shop">
            <span className="hover:text-yellow-500 transition">Shop</span>
          </Link>
          <Link href="/contact">
            <span className="hover:text-yellow-500 transition">Contact</span>
          </Link>
          <Link href="/faq">
            <span className="hover:text-yellow-500 transition">FAQ</span>
          </Link>
        </div>

        {/* Right Section - Contact & Socials */}
        <div className="flex flex-col items-center md:items-end">
          <Button variant='default'>Contact Us</Button>
          <div className="flex space-x-4 mt-2">
            <Link href="https://facebook.com">
              <span className="hover:text-yellow-500 transition">📘</span>
            </Link>
            <Link href="https://twitter.com">
              <span className="hover:text-yellow-500 transition">🐦</span>
            </Link>
            <Link href="https://instagram.com">
              <span className="hover:text-yellow-500 transition">📸</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-xs text-gray-500 mt-4">
        © {new Date().getFullYear()} PokéCart. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
