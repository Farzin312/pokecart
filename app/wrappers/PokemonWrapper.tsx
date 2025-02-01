import { PokemonProvider } from "../context/PokemonContext"
import { fetchPokemonByType } from "../utils/pokemonFetcher"

async function PokemonWrapper({ children }: { children: React.ReactNode }) {
  const pokemonList = await fetchPokemonByType()
  const randomIndex = Math.floor(Math.random() * pokemonList.length);
  const randomPokemon = pokemonList[randomIndex]
  return (
    <PokemonProvider initialData={pokemonList} randomPokemon={randomPokemon}>
      {children}
    </PokemonProvider>
  )
}

export default PokemonWrapper