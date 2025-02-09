"use client";

import React from "react";
import Link from "next/link";
import { Button, PokemonType, PokemonTypeImage } from "./reusable";
import Pokemon from "../type/Pokemon";

interface RandomTypeData {
  type: string;
  randomPokemon: Pokemon;
}

interface RandomPokemonSearchProps {
  randomTypeData: RandomTypeData[];
}

export default function RandomPokemonSearch({ randomTypeData }: RandomPokemonSearchProps) {
  const handleSearchClick = () => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Focus on search bar after scrolling finishes
    setTimeout(() => {
      const searchBar = document.querySelector("input[type='text']") as HTMLInputElement;
      if (searchBar) {
        searchBar.focus();
      }
    }, 500);
  };

  return (
    <div className="space-y-10">
      <h2 className="text-3xl md:text-3xl font-bold capitalize m-3 text-center flex flex-row items-center justify-center">Featured Types</h2>
      <ul className="flex flex-row justify-center gap-4 lg:gap-6">
        {randomTypeData.map(({ type, randomPokemon }) => (
          <li
            key={type}
            className="w-full md:w-[180px] bg-gradient-to-t to-white from-yellow-100 opacity-90 rounded-md shadow p-2 hover:scale-105 hover:opacity-100 transition-transform duration-300"
          >
            <h2 className="text-base md:text-lg font-semibold capitalize mb-2 text-center flex flex-row items-center justify-center space-x-2">
              <div>{type}</div>
              <div>{<PokemonTypeImage imageType={type} />}</div>
            </h2>
            <ul className="flex flex-col items-center gap-1">
              <PokemonType pokemon={randomPokemon} />
            </ul>
            <div className="flex justify-center mt-2">
              {/* Link to see all Pokémon of a specific type */}
              <Link href={`/products?type=${encodeURIComponent(type)}`}>
                <Button
                  variant="default"
                  className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold text-xs transition-transform duration-300"
                >
                  See More!
                </Button>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {/* Open Search Bar Button */}
      <div className="flex justify-center">
        <Button
          variant="default"
          className="bg-yellow-300 hover:bg-yellow-200 text-gray-900 font-bold rounded-md py-5 transition-transform transform hover:scale-105"
          onClick={handleSearchClick}
        >
          Search Pokémon! 🔍
        </Button>
      </div>
    </div>
  );
}
