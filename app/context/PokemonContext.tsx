'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback, memo } from 'react';
import { fetchPokemonByType, fetchPokemon } from '../utils/pokemonFetcher';

interface Pokemon {
  id?: number; // Some Pokémon from type fetches may not have an ID directly
  name: string;
  url: string;
}

interface PokemonContextValue {
  pokemonList: Pokemon[];
  selectedPokemon: Pokemon | null;
  isLoading: boolean;
  fetchPokemons: () => Promise<void>;
  searchPokemon: (name: string) => Promise<void>;
}

const PokemonContext = createContext<PokemonContextValue | undefined>(undefined);

const PokemonProvider = memo(function PokemonProvider({ children }: { children: ReactNode }) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  

  // Fetch 12 Pokémon from 3 distinct random types
  const fetchPokemons = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchPokemonByType();
      setPokemonList(data);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);
 
  // Search for a Pokémon by name
  const searchPokemon = useCallback(async (name: string) => {
    setIsLoading(true);
    try {
      const data = await fetchPokemon(name.toLowerCase());
      setSelectedPokemon(data);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
      setSelectedPokemon(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  console.log('PokemonList:', pokemonList);

  const contextValue = useMemo(() => ({
    pokemonList,
    selectedPokemon,
    isLoading,
    fetchPokemons,
    searchPokemon,
  }), [pokemonList, selectedPokemon, isLoading, fetchPokemons, searchPokemon]);

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
});

// Custom hook to use the context
function usePokemonContext() {
  const context = useContext(PokemonContext);
  if (!context) throw new Error("usePokemonContext must be used within a PokemonProvider");
  return context;
}

export { PokemonProvider, usePokemonContext };
