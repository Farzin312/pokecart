import { PokemonProvider } from "../context/PokemonContext";
import { fetchPokemonByType, fetchPokemonBySearch } from "../utils/pokemonFetcher";

interface PokemonWrapperProps {
  children: React.ReactNode;
  searchQuery?: string;
  typeFilter?: string;
}

async function PokemonWrapper({ children, searchQuery, typeFilter }: PokemonWrapperProps) {
  if ((searchQuery && searchQuery.trim() !== "") || (typeFilter && typeFilter.trim() !== "")) {
    const searchedPokemons = await fetchPokemonBySearch(
      searchQuery ? searchQuery.toLowerCase() : "",
      typeFilter ? typeFilter.toLowerCase() : undefined
    );
    return (
      <PokemonProvider
        initialData={[]}
        randomPokemon={null}
        allPokemons={searchedPokemons}
      >
        {children}
      </PokemonProvider>
    );
  } else {
    const pokemonList = await fetchPokemonByType();
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    const randomPokemon = pokemonList[randomIndex];

    return (
      <PokemonProvider
        initialData={pokemonList}
        randomPokemon={randomPokemon}
        allPokemons={pokemonList} 
      >
        {children}
      </PokemonProvider>
    );
  }
}

export default PokemonWrapper;
