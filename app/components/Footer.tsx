"use client";

import React, { useState } from "react";
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
        {/* Main Sections: About Us & Contact */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* About Us Section */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800">About Us</h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              Pokecart is your one-stop shop for fun, exclusive Pokémon merchandise.
              We bring a sprinkle of nostalgia and a dash of innovation to every product.
              Join us on this adventure and celebrate the world of Pokémon with us!
            </p>
          </div>

          {/* Contact Section */}
          <div className="m-auto text-center lg:m-0 ">
            <h3 className="text-2xl font-bold text-gray-800">Contact</h3>
            <div className="mt-2 space-y-3">
              {/* Email */}
                <div className="flex items-start justify-start space-x-2">
                {/* Gmail Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 5.5V18c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V5.5c0-.3.1-.6.3-.9l9 6.5c.3.2.7.2 1 0l9-6.5c.2.2.3.5.3.9zm-10 5.1L3.1 4.2C3.4 3.5 4.1 3 5 3h14c.9 0 1.6.5 1.9 1.2L12 10.6z" />
                </svg>
                <span className="text-gray-700">farzinshifat@gmail.com</span>
              </div>
              {/* LinkedIn */}
              <div className="flex items-start justify-start space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.3c-.97 0-1.75-.78-1.75-1.75S5.53 5.2 6.5 5.2 8.25 5.98 8.25 6.95 7.47 8.7 6.5 8.7zM20 19h-3v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2V19h-3v-9h3v1.2c.63-.93 1.74-1.2 2.5-1.2 1.93 0 3.5 1.57 3.5 3.5V19z" />
                </svg>
                <span className="text-gray-700">Farzin Shifat</span>
              </div>
              {/* GitHub */}
              <div className="flex items-start justify-start space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.235 1.84 1.235 1.07 1.835 2.809 1.305 3.495.998.108-.776.42-1.305.762-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.372.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg>
                <span className="text-gray-700">Farzin312</span>
              </div>
              {/* Contact Input & Send Button */}
              <div className="mt-3 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
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
            </div>
          </div>
        </div>

        {/* Discover More Button */}
        <div className="mt-6 flex justify-center">
          <Button
            variant="default"
            className="bg-yellow-300 hover:bg-yellow-200 text-gray-900 font-bold rounded-md py-3 px-6 transition-transform transform hover:scale-105"
            onClick={handleSearchClick}
          >
            Discover More! 🔍
          </Button>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center text-gray-700">
          © {new Date().getFullYear()} Pokecart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
