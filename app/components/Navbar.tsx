"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import Logo from "./Logo";
import { PokemonTypeImage, POKEMON_TYPES } from "./reusable";
import "@/public/styles.css";
import {
  Button,
  SearchBar,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./reusable";
import useScrollDirection from "../hooks/useScrollDirection";
import pokemonNames from "../data/pokemonNames.json";

function Navbar() {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const { show } = useScrollDirection();

  // Ref to the search container for detecting outside clicks
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Hide the desktop navbar on mobile devices
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 650);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close search suggestions when clicking outside the search container
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

  const handleFocus = () => setSearchActive(true);

  const handleSuggestionClick = (pokemonName: string) => {
    router.push(`/products?pokemon=${pokemonName}`);
    setSearchValue("");
    setSearchActive(false);
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
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isMobile) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-gradient-to-r from-white to-yellow-100 opacity-80 shadow-md px-6 h-[50px] transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      } ${searchActive ? "opacity-100" : ""}`}
    >
      <Link href="/">
        <Logo />
      </Link>

      <div className="flex min-w-12 items-center px-2 lg:w-6/12 space-x-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-yellow-300 hover:bg-yellow-400 px-3 py-1"
            >
              {selectedType === "all"
                ? "All Types"
                : selectedType.toUpperCase()}{" "}
              ⏷
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32 bg-yellow-100 border border-yellow-300 shadow-lg rounded-md max-h-[200px] overflow-y-auto">
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
                <Image src="/icons/all.svg" alt="All" width={40} height={40} unoptimized />
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
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search input container (with ref) */}
        <div className="relative flex w-full" ref={searchContainerRef}>
          <div className="flex w-full border border-yellow-300 rounded-md">
            <SearchBar
              type="text"
              placeholder="Search Pokémon 🤩"
              onFocus={handleFocus}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full rounded-md px-2 py-1 bg-yellow-100 hover:border-yellow-400"
            />

            <Button
              className="text-2xl px-3 py-1 hover:bg-transparent hover:border hover:border-yellow-400"
              variant="ghost"
              onClick={handleSearch}
            >
              <Image
                src="/search.png"
                alt="Search"
                width={35}
                height={35}
                unoptimized
              />
            </Button>
          </div>

          {/* Suggestions dropdown */}
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
      </div>

      <ul className="flex space-x-4">
        <li>
          <Link href="/wishlist">
            <Button className="text-2xl" variant="link">
              <Image
                src="/wishlist.png"
                alt="Wishlist"
                width={30}
                height={30}
                unoptimized
              />
            </Button>
          </Link>
        </li>
        {user ? (
          <li>
            <Button variant="destructive" className='fon-bold' onClick={handleLogout}>
              Logout
            </Button>
          </li>
        ) : (
          <li>
            <Link href="/auth/login">
              <Button className="font-bold" variant="default">Login</Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
