"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import Logo from "./Logo";
import Link from "next/link";
import { Button, SearchBar } from "./reusable";

function Navbar() {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
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
    if (searchValue.trim() !== "") {
      router.push(`/products?pokemon=${encodeURIComponent(searchValue)}`);
      setSearchValue("");
    }
  }

  // Logout function
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
      className={`${"flex w-full justify-between items-center bg-gradient-to-r from-white to-yellow-100 opacity-80 shadow-md rounded-md px-2"} ${
        searchActive ? "opacity-100" : ""
      }`}
    >
      <Link href="/">
        <Logo />
      </Link>
      <div
        className={`flex w-full max-w-sm items-center space-x-1 border rounded-md ${
          searchActive ? "border rounded-md bg-yellow-300 border-gray-50 shadow-lg" : ""
        }`}
      >
        <SearchBar
          type="text"
          placeholder="Search for your Pokemon 🤩"
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className={searchActive ? "focus-visible:ring-yellow-300" : ""}
        />
        <Button className="text-2xl" variant="link" onClick={handleSearch}>
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
          // Show Logout button if user is logged in
          <li>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </li>
        ) : (
          // Show Login button if user is NOT logged in
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
