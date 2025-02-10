"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./reusable";

export default function Footer() {
  const [contactMessage, setContactMessage] = useState("");

  const handleSearchClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      const searchBar = document.querySelector("input[type='text']") as HTMLInputElement;
      if (searchBar) {
        searchBar.focus();
      }
    }, 500);
  };

  const handleSendEmail = () => {
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=farzinshifat@gmail.com&su=To%20Pokecart&body=${encodeURIComponent(
      contactMessage
    )}`;
    window.open(gmailComposeUrl, "_blank");
  };

  return (
    <footer className="w-full bg-gradient-to-r from-white to-yellow-100 py-8 mt-8 border-t border-yellow-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* About Us Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-center text-gray-800 lg:text-start">About Us</h3>
          <p className="mt-2 text-gray-700 leading-relaxed">
            Pokecart is your one-stop shop for fun, exclusive Pokémon merchandise.
            We bring a sprinkle of nostalgia and a dash of innovation to every product.
            Join us on this adventure and celebrate the world of Pokémon with us!
          </p>
        </div>

        {/* Team and Contact Sections */}
        <div className="flex flex-row md:justify-between md:mx-20 lg:justify-between lg:items-start lg:mx-20">
          {/* Team Section */}
          <div className="mb-6 lg:mb-0 lg:w-1/2">
            <h3 className="text-2xl font-bold text-gray-800 text-center lg:text-start">Team</h3>
            <div className="mt-4 flex flex-col items-center lg:items-start space-y-4">
              {/* Farzin */}
              <div className="flex items-center space-x-4">
                <Image
                  src="/team/farzin.jpg"
                  alt="Farzin Shifat"
                  width={65}
                  height={65}
                  className="rounded-full border border-gray-300 shadow-md"
                  unoptimized
                />
                <div>
                  <p className="font-semibold text-gray-800">Farzin Shifat</p>
                  <p className="text-sm text-gray-700">Fullstack Developer</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <a href="https://github.com/Farzin312" target="_blank" rel="noopener noreferrer">
                      <Image
                        src="/icons/github.png"
                        alt="GitHub Icon"
                        width={20}
                        height={20}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        unoptimized
                      />
                    </a>
                    <a href="https://www.linkedin.com/in/farzin-shifat-5b7b43207/" target="_blank" rel="noopener noreferrer">
                      <Image
                        src="/icons/linkedin.png"
                        alt="LinkedIn Icon"
                        width={20}
                        height={20}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        unoptimized
                      />
                    </a>
                  </div>
                </div>
              </div>
              {/* Eric */}
              <div className="flex items-center space-x-4">
                <Image
                  src="/fallback-image.jpg"
                  alt="Eric Fang"
                  width={65}
                  height={65}
                  className="rounded-full border border-gray-300 shadow-md"
                  unoptimized
                />
                <div>
                  <p className="font-semibold text-gray-800">Eric Fang</p>
                  <p className="text-sm text-gray-700">UI/UX Designer</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <a href="https://www.linkedin.com/in/eric-fang-b83890195/" target="_blank" rel="noopener noreferrer">
                      <Image
                        src="/icons/linkedin.png"
                        alt="LinkedIn Icon"
                        width={20}
                        height={20}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        unoptimized
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col ml-10 lg:ml-0">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-800">Contact</h3>
              <div className="mt-4 space-y-3">
                {/* Farzin Email */}
                <div className="flex items-center justify-start lg:justify-start space-x-2">
                  <Image
                    src="/icons/email.png"
                    alt="Email Icon"
                    width={20}
                    height={20}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    unoptimized
                  />
                  <span className="text-gray-700">farzinshifat@gmail.com</span>
                </div>

                {/* Farzin LinkedIn */}
                <div className="flex items-center justify-start lg:justify-start space-x-2">
                  <Image
                    src="/icons/linkedin.png"
                    alt="LinkedIn Icon"
                    width={20}
                    height={20}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    unoptimized
                  />
                  <span className="text-gray-700">
                    <a
                      href="https://www.linkedin.com/in/farzin-shifat-5b7b43207/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Farzin Shifat
                    </a>
                  </span>
                </div>

                {/* Farzin GitHub */}
                <div className="flex items-center justify-start lg:justify-start space-x-2">
                  <Image
                    src="/icons/github.png"
                    alt="GitHub Icon"
                    width={20}
                    height={20}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    unoptimized
                  />
                  <span className="text-gray-700">
                    <a
                      href="https://github.com/Farzin312"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Farzin312
                    </a>
                  </span>
                </div>

                {/* Contact Input & Send Button */}
                <div className="mt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="text"
                    placeholder="Your Message"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                  />
                  <button
                    onClick={handleSendEmail}
                    className="px-4 py-2 bg-yellow-300 text-gray-900 font-bold rounded-r-md hover:bg-yellow-200 transition"
                  >
                    Send
                  </button>
                </div>
                <Button
                  variant="default"
                  className="bg-yellow-300 hover:bg-yellow-200 text-gray-900 font-bold px-8 rounded-md transition-transform transform hover:scale-105"
                  onClick={handleSearchClick}
                >
                  Discover More! <Image src="/search.png" alt="Search Icon" width={25}height={25} unoptimized />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center text-gray-700">
          © {new Date().getFullYear()} Pokecart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
