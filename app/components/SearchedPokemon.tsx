'use client';
import { usePokemonContext } from "../context/PokemonContext";
import { PokemonType } from "./reusable";

interface SearchedPokemonProps {
  searchQuery?: string;
}

export default function SearchedPokemon({ searchQuery }: SearchedPokemonProps) {
  const { allPokemons } = usePokemonContext();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">
        {searchQuery && searchQuery.trim() !== ""
          ? `Search Results for "${searchQuery}"`
          : "Featured Pokémon"}
      </h1>

      {allPokemons.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {allPokemons.map((pokemon) => (
            <PokemonType key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No Pokémon found.</p>
      )}
    </div>
  );
}
