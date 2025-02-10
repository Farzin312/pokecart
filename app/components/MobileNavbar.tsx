"use client";

import { useState, useEffect, useRef } from "react";
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
import pokemonNames from "../data/pokemonNames.json";

function MobileNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { show } = useScrollDirection();

  // Ref to the search container for detecting outside clicks in mobile overlay
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Update isMobile based on current window width
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

  // Close suggestions when clicking outside the search container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      setSearchActive(false);
      setMenuOpen(false);
    }
  };

  const handleSuggestionClick = (pokemonName: string) => {
    router.push(`/products?pokemon=${pokemonName}`);
    setSearchValue("");
    setSearchActive(false);
    setMenuOpen(false);
  };

  // Filter the imported pokemonNames for suggestions
  const filteredSuggestions =
    searchValue.trim().length > 0
      ? (pokemonNames as string[])
          .filter((name) =>
            name.toLowerCase().startsWith(searchValue.toLowerCase())
          )
          .slice(0, 10)
      : [];

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

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="bg-yellow-100 shadow-md rounded-b-md z-60">
          <div className="p-4 space-y-4">
            {/* Search Input with Suggestions */}
            <div className="relative" ref={searchContainerRef}>
              <div className="flex border border-yellow-300 rounded-md">
                <input
                  type="text"
                  placeholder="Search Pokémon 🤩"
                  value={searchValue}
                  onFocus={() => setSearchActive(true)}
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

              {/* Suggestions dropdown for mobile */}
              {searchActive && filteredSuggestions.length > 0 && (
                <ul className="absolute left-0 right-0 top-full bg-yellow-50 border border-yellow-300 rounded-md mt-1 max-h-60 overflow-y-auto z-50">
                  {filteredSuggestions.map((name, index) => (
                    <li
                      key={index}
                      onMouseDown={() => handleSuggestionClick(name)}
                      className="cursor-pointer px-2 py-1 hover:bg-yellow-100"
                    >
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Pokémon Type Filter using DropdownMenu */}
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

            {/* Navigation Links */}
            <div className="flex flex-col space-y-2">
              <Link href="/cart">
                <Button
                  variant="default"
                  className="w-full text-left px-3 py-2 bg-yellow-300 hover:bg-yellow-400 rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image
                    src="/wishlist.png"
                    alt="Wishlist"
                    width={25}
                    height={25}
                    unoptimized
                  />
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
                    className="w-full font-bold text-left px-3 py-2 rounded-md"
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
