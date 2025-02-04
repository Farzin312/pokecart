import { Suspense } from 'react';

import { PokemonCard, PokemonSpotLight, Spinner } from './components/reusable';
import RandomPokemonSearch from './components/RandomPokemonSearch';
import PokemonWrapper from './wrappers/PokemonWrapper';
import fetchRandomPokemonSearchType, { fetchPokemon } from './utils/pokemonFetcher';

export default async function page() {
  async function getRandomTypeAndPokemon() {
    const types = await fetchRandomPokemonSearchType();

    const typeData = await Promise.all(
      types.map(async (type) => {
        try {
          // Fetch details for this type
          const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
          const data = await res.json();

          // Ensure there are available Pokémon
          const pokemonsOfType = data.pokemon;
          if (!pokemonsOfType || pokemonsOfType.length === 0) {
            console.warn(`No Pokémon found for type: ${type}`);
            return null; // Skip this type
          }

          // Randomly select one Pokémon
          const randomIndex = Math.floor(Math.random() * pokemonsOfType.length);
          const selected = pokemonsOfType[randomIndex]?.pokemon;

          // Validate selection before fetching
          if (!selected) {
            console.warn(`Failed to select a Pokémon for type: ${type}`);
            return null;
          }

          // Fetch the full Pokémon details
          const pokemonData = await fetchPokemon(selected.name);
          return { type, randomPokemon: pokemonData };
        } catch (error) {
          console.error(`Error fetching type: ${type}`, error);
          return null; // Skip if there's an error
        }
      })
    );

    // Remove any null results
    return typeData.filter(Boolean);
  }

  // Fetch types and Pokémon
  const randomTypeData = await getRandomTypeAndPokemon();

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Suspense fallback={<Spinner />}>
        <PokemonWrapper>
          <PokemonSpotLight />
          <div className="flex flex-row justify-center space-x-4">
            <PokemonCard />
            <RandomPokemonSearch randomTypeData={randomTypeData.filter((data) => data !== null)} />
          </div>
        </PokemonWrapper>
      </Suspense>
    </div>
  );
}
