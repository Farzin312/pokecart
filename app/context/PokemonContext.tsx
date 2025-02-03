"use client";

import { createContext, useContext, ReactNode, useMemo, memo, useState } from "react";
import Pokemon from "../type/Pokemon";

interface PokemonContextValue {
  pokemonList: Pokemon[];
  randomPokemon: Pokemon | null;
  allPokemons: Pokemon[];
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;

}

const PokemonContext = createContext<PokemonContextValue | undefined>(undefined);

const PokemonProvider = memo(function PokemonProvider({
  children,
  initialData,
  randomPokemon,
  allPokemons,
}: { children: ReactNode; initialData: Pokemon[]; randomPokemon: Pokemon | null; allPokemons: Pokemon[] }) {
  const [isHovered, setIsHovered] = useState(false);
  const pokemonList: Pokemon[] = initialData;



  const contextValue = useMemo(
    () => ({
      pokemonList,
      randomPokemon,
      allPokemons,
      isHovered,
      setIsHovered
    }),
    [pokemonList, randomPokemon, allPokemons, isHovered, setIsHovered]
  );

  return <PokemonContext.Provider value={contextValue}>{children}</PokemonContext.Provider>;
});

function usePokemonContext() {
  const context = useContext(PokemonContext);
  if (!context) throw new Error("usePokemonContext must be used within a PokemonProvider");
  return context;
}

export { PokemonProvider, usePokemonContext };
