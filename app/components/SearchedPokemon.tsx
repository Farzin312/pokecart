'use client';
import { useState, useEffect } from "react";
import  Pokemon  from "../type/Pokemon"; // Adjust the import path as necessary
import { usePokemonContext } from "../context/PokemonContext";
import { PokemonType, Pagination, Spinner, PokemonTypeImage } from "./reusable";


interface SearchedPokemonProps {
  searchQuery?: string;
}

export default function SearchedPokemon({ searchQuery }: SearchedPokemonProps) {
  const { allPokemons, randomType = "all" } = usePokemonContext();
  const itemsPerPage = 30;


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allPokemons.length / itemsPerPage);
  const [currentPokemons, setCurrentPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true);
  
    // Using a timeout to simulate a delay (e.g. for slow processing or network response)
    const timer = setTimeout(() => {
      // Optionally filter the Pokémon if a search query exists:
      const filteredPokemons =
        searchQuery && searchQuery.trim() !== ""
          ? allPokemons.filter((pokemon) =>
              pokemon.name.toLowerCase().startsWith(searchQuery.toLowerCase())
            )
          : allPokemons;
  
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedPokemons: Pokemon[] = filteredPokemons.slice(
        startIndex,
        startIndex + itemsPerPage
      );
      setCurrentPokemons(paginatedPokemons);
      setIsLoading(false);
    }, 500);
  
    return () => clearTimeout(timer);
  }, [currentPage, allPokemons, searchQuery]);

  return (
    <div className="p-4">
      <h1 className="flex flex-row justify-center text-xl font-bold items-center space-x-2">
        {searchQuery && searchQuery.trim() !== ""
          ? `${allPokemons.length} Results for "${searchQuery}"`
          : (
            <>
           <div>
            
              {allPokemons.length} Results for 
            </div>
            <div>
            <PokemonTypeImage imageType={randomType} />
              </div>
            </>
          )}
          
        
      </h1>

      {isLoading ? (
        <div className="flex justify-center mt-6">
          <Spinner />
        </div>
      ) : (
        <>
      {currentPokemons.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4 space-x-2">
          {currentPokemons.map((pokemon) => (
            <PokemonType key={pokemon.name} pokemon={pokemon} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4">No Pokémon found.</p>
      )}
      </>
      )}

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}
