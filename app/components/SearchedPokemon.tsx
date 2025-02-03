'use client';
import { useState } from "react";
import { usePokemonContext } from "../context/PokemonContext";
import { PokemonType, Pagination } from "./reusable";

interface SearchedPokemonProps {
  searchQuery?: string;
}

export default function SearchedPokemon({ searchQuery }: SearchedPokemonProps) {
  const { allPokemons } = usePokemonContext();
  const itemsPerPage = 30; 

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allPokemons.length / itemsPerPage);

  // Get Pokémon for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPokemons = allPokemons.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4">
      <h1 className="flex justify-center text-xl font-bold">
        {searchQuery && searchQuery.trim() !== ""
          ? `Search Results for "${searchQuery}"`
          : "Featured Pokémon"}
      </h1>

      {currentPokemons.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
          {currentPokemons.map((pokemon) => (
            <PokemonType key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No Pokémon found.</p>
      )}

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}
