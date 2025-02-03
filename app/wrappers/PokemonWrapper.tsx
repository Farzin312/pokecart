import { PokemonProvider } from "../context/PokemonContext";
import { fetchPokemonByType, fetchPokemonBySearch } from "../utils/pokemonFetcher";

interface PokemonWrapperProps {
  children: React.ReactNode;
  searchQuery?: string;
}

async function PokemonWrapper({ children, searchQuery }: PokemonWrapperProps) {
  if (searchQuery && searchQuery.trim() !== "") {
    const searchedPokemons = await fetchPokemonBySearch(searchQuery.toLowerCase());
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
