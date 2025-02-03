"use client";

import { createContext, useContext, ReactNode, useMemo, memo } from "react";
import Pokemon from "../type/Pokemon";

interface PokemonContextValue {
  pokemonList: Pokemon[];
  randomPokemon: Pokemon | null;
  allPokemons: Pokemon[];

}

const PokemonContext = createContext<PokemonContextValue | undefined>(undefined);

const PokemonProvider = memo(function PokemonProvider({
  children,
  initialData,
  randomPokemon,
  allPokemons,
}: { children: ReactNode; initialData: Pokemon[]; randomPokemon: Pokemon | null; allPokemons: Pokemon[] }) {
  const pokemonList: Pokemon[] = initialData;



  const contextValue = useMemo(
    () => ({
      pokemonList,
      randomPokemon,
      allPokemons,
    }),
    [pokemonList, randomPokemon, allPokemons]
  );

  return <PokemonContext.Provider value={contextValue}>{children}</PokemonContext.Provider>;
});

function usePokemonContext() {
  const context = useContext(PokemonContext);
  if (!context) throw new Error("usePokemonContext must be used within a PokemonProvider");
  return context;
}

export { PokemonProvider, usePokemonContext };
