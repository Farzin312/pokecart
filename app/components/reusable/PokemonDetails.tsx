"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Pokemon from "@/app/type/Pokemon";
import { Button } from "./Button";
import Modal from "./Modal";
import { PokemonTypeImage } from "./PokemonTypeImage";
// Import the helper to create a Supabase client on the client side
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface PokemonDetailsProps {
  selectedPokemon: Pokemon | null;
  similarPokemons: Pokemon[];
}

function PokemonDetails({ selectedPokemon, similarPokemons }: PokemonDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [merchandise, setMerchandise] = useState("Plushies");
  const [customMerchandise, setCustomMerchandise] = useState("");
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedPokemon) return;

    // This part remains unchanged because you still update "recently viewed"
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      console.warn("User is not logged in; skipping recently viewed update.");
      return;
    }

    const saveRecentlyViewed = async () => {
      try {
        // 🔥 Fetch user ID from Firebase token
        const res = await fetch("/api/getUserId", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const { userId } = await res.json();
        if (!res.ok || !userId) throw new Error("Failed to get user ID");

        // 🔥 Add to Recently Viewed in your database/Supabase
        await fetch("/api/recentlyViewed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            pokemon: {
              id: selectedPokemon.id,
              name: selectedPokemon.name,
              sprites: selectedPokemon.sprites,
            },
          }),
        });
      } catch (error) {
        console.error("❌ Error updating recently viewed:", error);
      }
    };

    saveRecentlyViewed();
  }, [selectedPokemon]);

  function handleAmazonAffiliateLink(pokemonName: string, merchandise: string) {
    const baseUrl = process.env.NEXT_PUBLIC_AMAZON_BASE_URL;
    const category = process.env.NEXT_PUBLIC_AMAZON_CATEGORY;
    const affiliateTag = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG;
    const linkCode = process.env.NEXT_PUBLIC_AMAZON_LINK_CODE;
    const language = process.env.NEXT_PUBLIC_AMAZON_LANGUAGE;
    const refTag = process.env.NEXT_PUBLIC_AMAZON_REF;
    const searchQuery = `${pokemonName} ${merchandise} pokemon`;
    return `${baseUrl}?k=${encodeURIComponent(searchQuery)}&i=${category}&linkCode=${linkCode}&tag=${affiliateTag}&language=${language}&ref_=${refTag}`;
  }

  async function handleAddToWishlist() {
    if (!selectedPokemon) return;
  
    // Compute the merchandise to use
    const searchMerchandise =
      merchandise === "Custom" && customMerchandise.trim() !== ""
        ? customMerchandise
        : merchandise;
  
    // Get the Firebase token from cookies (you already do this)
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    if (!token) {
      setModalMessage("Please log in to add to wishlist.");
      return;
    }
  
    // Use your existing API to get the Firebase userId
    const res = await fetch("/api/getUserId", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const { userId } = await res.json();
    if (!res.ok || !userId) {
      setModalMessage("Failed to get user ID. Please log in again.");
      return;
    }
  
    // Initialize the Supabase client (without checking supabase.auth.getSession)
    const supabase = createClientComponentClient();
  
    // Check how many wishlist items exist for this user
    const { count, error: countError } = await supabase
      .from("wishlist")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId);
  
    if (countError) {
      console.error("Error checking wishlist count:", countError);
      setModalMessage("Error checking wishlist. Please try again.");
      return;
    }
  
    if (count !== undefined && count !== null && count >= 10) {
      setModalMessage("Maximum Pokemon saved, please delete before adding another one.");
      return;
    }
  
    // Insert the new wishlist item into Supabase
    const { error: insertError } = await supabase
      .from("wishlist")
      .insert([
        {
          user_id: userId,
          merchandise_type: searchMerchandise,
          pokemon: selectedPokemon, // Make sure your column supports JSON if needed
        },
      ]);
  
    if (insertError) {
      console.error("Error adding to wishlist:", insertError);
      setModalMessage(insertError.message);
    } else {
      setModalMessage("Added to wishlist!");
    }
  }  

  if (!selectedPokemon)
    return (
      <h1 className="text-center text-gray-500 text-lg">
        No Pokémon available.
      </h1>
    );

  // Compute the merchandise value to pass to the Amazon link
  const computedMerchandise =
    merchandise === "Custom" && customMerchandise.trim() !== ""
      ? customMerchandise
      : merchandise;

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center text-gray-900 p-8 gap-12">
        {/* Left Section – Pokémon Showcase */}
        <div className="p-8 max-w-xl text-center">
          <h2 className="text-3xl lg:text-5xl font-extrabold capitalize drop-shadow-md">
            {selectedPokemon.name}
          </h2>
          <div className="flex justify-center mt-4 transition-transform duration-300 hover:scale-105">
            <Image
              src={
                selectedPokemon.sprites?.other?.["official-artwork"]?.front_default ||
                selectedPokemon.sprites?.front_default ||
                "/images/fallback-image.jpg"
              }
              alt={selectedPokemon.name}
              width={300}
              height={300}
              priority
              className="rounded-lg"
              unoptimized
            />
          </div>
          <h3 className="flex flex-row justify-center flex-wrap mt-2 text-lg font-semibold text-yellow-600">
            Type:{" "}
            <span className="flex flex-row flex-wrap capitalize ml-1 space-x-2">
              {selectedPokemon.types?.map((t, index) => (
                <span key={index} className="flex items-center space-x-1">
                  <span>{t.type.name}</span>
                  <PokemonTypeImage imageType={t.type.name} />
                  {index < (selectedPokemon.types?.length ?? 0) - 1 && <span>,</span>}
                </span>
              )) || <span>Unknown</span>}
            </span>
          </h3>
          <p className="text-lg font-semibold text-yellow-600">
            Abilities:{" "}
            <span className="capitalize">
              {selectedPokemon.abilities?.map((a) => a.ability.name).join(", ") || "Unknown"}
            </span>
          </p>
          <div className="items-center justify-center mt-6 w-full">
            <h3 className="text-xl font-bold text-gray-700 mb-2">Stats</h3>
            {selectedPokemon.stats?.map((s) => (
              <div key={s.stat.name} className="mb-2">
                <p className="text-gray-600 text-sm">
                  {s.stat.name.replace("-", " ")}: {s.base_stat}
                </p>
                <div className="w-full bg-yellow-200 rounded-full h-2.5">
                  <div
                    className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((s.base_stat / 220) * 100, 100)}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-gray-600">
            Height:{" "}
            <span className="font-semibold text-gray-800">
              {(selectedPokemon.height ?? 0) / 10}m
            </span>{" "}
            | Weight:{" "}
            <span className="font-semibold text-gray-800">
              {(selectedPokemon.weight ?? 0) / 10}kg
            </span>
          </p>
        </div>

        {/* Right Section – Purchase, Cart, and Similar Pokémon */}
        <div className="rounded-lg p-8 max-w-lg flex flex-col items-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
            Buy {selectedPokemon.name}!
          </h3>
          <p className="text-gray-600 text-md mt-2">
            Limited stock available! Secure yours today. ⚡
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <button
              className="px-3 py-2 bg-yellow-300 text-gray-800 rounded-md hover:bg-yellow-200"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              ➖
            </button>
            <span className="text-lg font-bold">{quantity}</span>
            <button
              className="px-3 py-2 bg-yellow-300 text-gray-800 rounded-md hover:bg-yellow-200"
              onClick={() => setQuantity((q) => q + 1)}
            >
              ➕
            </button>
          </div>
          <p className="mt-4 text-2xl font-bold text-yellow-600">
            ${(selectedPokemon.base_experience ?? 50) * quantity}.00
          </p>

          {/* Merchandise selection */}
          <div className="mt-4 w-full">
            <label htmlFor="merchandise-select" className="block text-gray-700 font-semibold mb-2">
              Select Merchandise:
            </label>
            <select
              id="merchandise-select"
              value={merchandise}
              onChange={(e) => setMerchandise(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            >
              <option value="Plushies">Plushies</option>
              <option value="Figurine">Figurine</option>
              <option value="Nanoblock">Nanoblock</option>
              <option value="Pokemon Card">Pokemon Card</option>
              <option value="Squishmallows">Squishmallows</option>
              <option value="Custom">Custom</option>
            </select>
            {merchandise === "Custom" && (
              <input
                type="text"
                placeholder="Enter custom merchandise"
                value={customMerchandise}
                onChange={(e) => setCustomMerchandise(e.target.value)}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            )}
          </div>

          <div className="mt-6 flex flex-col justify-center items-center space-y-3 w-full">
            <Button
              onClick={handleAddToWishlist}
              variant="outline"
              className="w-6/12 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-full transition-transform hover:scale-105 lg:w-full"
            >
              Add to Wishlist ❤️
            </Button>
            <Button
              variant="destructive"
              className="w-6/12 font-bold rounded-full transition-transform hover:scale-105 lg:w-full"
            >
              <Link
                href={handleAmazonAffiliateLink(selectedPokemon.name, computedMerchandise)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy Now 🔥
              </Link>
            </Button>
          </div>

          {/* Similar Pokémon */}
          <div className="mt-8 w-full h-auto">
            <h4 className="flex justify-center text-2xl font-bold text-gray-800 mb-4">
              Similar Pokémon
            </h4>
            <div className="md:flex overflow-x-auto grid grid-cols-2 gap-4">
              {similarPokemons.map((poke) => (
                <Link key={poke.id} href={`/products/${poke.name}`}>
                  <div className="min-w-[125px] min-h-[150px] py-2 border flex flex-col items-center justify-center border-gray-200 rounded-lg shadow hover:scale-105 transition-transform">
                    <Image
                      src={
                        poke.sprites?.other?.["official-artwork"]?.front_default ||
                        poke.sprites?.front_default ||
                        "/images/fallback-image.jpg"
                      }
                      alt={poke.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                      unoptimized
                    />
                    <p className="text-center text-sm mt-2 capitalize">{poke.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {modalMessage && (
        <Modal message={modalMessage} onClose={() => setModalMessage(null)} />
      )}
    </>
  );
}

export default PokemonDetails;
