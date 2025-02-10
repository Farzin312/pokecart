"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import Logo from "./Logo";
import { PokemonTypeImage, POKEMON_TYPES } from "./reusable";
import "@/public/styles.css";
import useScrollDirection from "../hooks/useScrollDirection";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./reusable";

function MobileNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const {show} = useScrollDirection();

  // Update isMobile based on the current window width
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 650);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (searchValue.trim() !== "") {
      query.append("pokemon", searchValue);
    }
    if (selectedType !== "all") {
      query.append("type", selectedType);
    }
    if (query.toString()) {
      router.push(`/products?${query.toString()}`);
      setSearchValue("");
      setMenuOpen(false); // close menu after search
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Render only on mobile viewports
  if (!isMobile) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top Navbar with a smaller height */}
      <nav className="flex justify-between items-center bg-gradient-to-r from-white to-yellow-100 shadow-md px-4 h-11">
        <Link href="/">
          <Logo />
        </Link>
        <button
          className="p-2 rounded-full bg-transparent focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <Image
              src="/icons/close.svg"
              alt="Close Menu"
              width={24}
              height={24}
              unoptimized
            />
          ) : (
            <Image
              src="/icons/hamburger.svg"
              alt="Open Menu"
              width={24}
              height={24}
              unoptimized
            />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay (now using a higher z-index so it isn’t greyed out) */}
      {menuOpen && (
        <div className="bg-yellow-100 shadow-md rounded-b-md z-60">
          <div className="p-4 space-y-4">
            {/* Search Input */}
            <div className="flex border border-yellow-300 rounded-md">
              <input
                type="text"
                placeholder="Search Pokémon 🤩"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full px-2 py-1 bg-yellow-100 rounded-l-md focus:outline-none"
              />
              <Button
                variant="default"
                className="px-3 py-1 bg-yellow-300 hover:bg-yellow-400 rounded-r-md focus:outline-none"
                onClick={handleSearch}
              >
                <Image
                  src="/search.png"
                  alt="Search"
                  width={25}
                  height={25}
                  unoptimized
                />
              </Button>
            </div>

            {/* Pokémon Type Filter using DropdownMenu (with icons) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full bg-yellow-300 hover:bg-yellow-400 px-3 py-1"
                >
                  {selectedType === "all"
                    ? "All Types"
                    : selectedType.toUpperCase()}{" "}
                  ⏷
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 bg-yellow-100 border border-yellow-300 shadow-lg rounded-md max-h-[200px] overflow-y-auto">
                <DropdownMenuLabel className="text-gray-700 border-b-2 border-yellow-300">
                  Filter by Type
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={selectedType === "all"}
                  onCheckedChange={() => setSelectedType("all")}
                  className="flex flex-row pl-6"
                >
                  <div className="icon mr-2">
                    <Image
                      src="/icons/all.svg"
                      alt="All"
                      width={40}
                      height={40}
                    />
                  </div>
                  All
                </DropdownMenuCheckboxItem>
                {POKEMON_TYPES.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={selectedType === type}
                    onCheckedChange={() => setSelectedType(type)}
                    className="flex items-center space-x-2"
                  >
                    <PokemonTypeImage imageType={type} />
                    <span>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Navigation Links using the Button component */}
            <div className="flex flex-col space-y-2">
              <Link href="/cart">
                <Button
                  variant="default"
                  className="w-full text-left px-3 py-2 bg-yellow-300 hover:bg-yellow-400 rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image src="/wishlist.png" alt="Wishlist" width={25} height={25} />
                </Button>
              </Link>
              {user ? (
                <Button
                  variant="destructive"
                  className="w-full text-left px-3 py-2 rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Link href="/auth/login">
                  <Button
                    variant="default"
                    className="w-full text-left px-3 py-2 rounded-md"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNavbar;
