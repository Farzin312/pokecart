"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import Logo from "./Logo";
import Link from "next/link";
import { 
  Button, SearchBar, DropdownMenu, DropdownMenuCheckboxItem,
  DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./reusable";

const POKEMON_TYPES = [
  "all", "normal", "fire", "water", "grass", "electric", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

function Navbar() {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all"); // Default: "All"
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  function handleFocus() {
    setSearchActive(true);
  }

  function handleBlur() {
    setSearchActive(false);
  }

  function handleSearch() {
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
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav
      className={`flex w-full justify-between items-center bg-gradient-to-r from-white to-yellow-100 opacity-80 shadow-md rounded-md px-2 ${
        searchActive ? "opacity-100" : ""
      }`}
    >
      <Link href="/">
        <Logo />
      </Link>

      {/* Styled Search Container */}
      <div className="flex w-full max-w-md items-center bg-yellow-300 border border-gray-300 rounded-md shadow-md">
        {/* Dropdown Type Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-yellow-300 hover:bg-yellow-400 px-3 py-1">
              {selectedType === "all" ? "All Types" : selectedType.toUpperCase()} ⏷
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32 bg-yellow-100 border border-yellow-300 shadow-lg rounded-md max-h-[200px] overflow-y-auto">
            <DropdownMenuLabel className="text-gray-700">Filter by Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* 'All' Option */}
            <DropdownMenuCheckboxItem
              checked={selectedType === "all"}
              onCheckedChange={() => setSelectedType("all")}
            >
              All
            </DropdownMenuCheckboxItem>
            {POKEMON_TYPES.filter(type => type !== "all").map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={selectedType === type}
                onCheckedChange={() => setSelectedType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Bar */}
        <SearchBar
          type="text"
          placeholder="Search Pokémon 🤩"
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full focus:ring-2 focus:ring-yellow-400 rounded-md px-2 py-1 bg-yellow-100"
        />

        {/* Search Button */}
        <Button className="text-2xl bg-yellow-300 hover:bg-yellow-400 px-3 py-1" variant="ghost" onClick={handleSearch}>
          🔎
        </Button>
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
