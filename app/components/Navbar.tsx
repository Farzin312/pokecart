"use client";

import { useState, useEffect } from "react";
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

function Navbar() {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const showNavbar = useScrollDirection();
  const [isMobile, setIsMobile] = useState(false);

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

  const handleFocus = () => setSearchActive(true);
  const handleBlur = () => setSearchActive(false);

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

  // Return nothing if on a mobile viewport (so the MobileNavbar takes over)
  if (isMobile) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-gradient-to-r from-white to-yellow-100 opacity-80 shadow-md px-6 h-[50px] transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${searchActive ? "opacity-100" : ""}`}
    >
      <Link href="/">
        <Logo />
      </Link>

      {/* Styled Search Container */}
      <div className="flex min-w-12 items-center px-2 lg:w-6/12 space-x-1">
        {/* Dropdown Type Filter */}
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
              className="flex flex-row pl-6 "
            >
              <div className="icon mr-2">
                <Image src="/icons/all.svg" alt="All" width={40} height={40} />
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

        <div className="flex w-full border border-yellow-300 rounded-md">
          {/* Search Bar */}
          <SearchBar
            type="text"
            placeholder="Search Pokémon 🤩"
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full rounded-md px-2 py-1 bg-yellow-100 hover:border-yellow-400"
          />

          {/* Search Button */}
          <Button
            className="text-2xl px-3 py-1 hover:bg-transparent hover:border hover:border-yellow-400"
            variant="ghost"
            onClick={handleSearch}
          >
            <Image src="/search.png" alt="Search" width={35} height={35} />
          </Button>
        </div>
      </div>

      <ul className="flex space-x-4">
        <li>
          <Link href="/cart">
            <Button className="text-2xl" variant="link">
              🛒
            </Button>
          </Link>
        </li>
        {user ? (
          <li>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </li>
        ) : (
          <li>
            <Link href="/auth/login">
              <Button variant="default">Login</Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
