import { Suspense } from 'react';
import { PokemonCard, Spinner } from './components/reusable';
import {RandomPokemonSearch, Hero } from './components';
import PokemonWrapper from './wrappers/PokemonWrapper';
import {fetchRandomPokemonSearchType, fetchPokemon } from './utils/pokemonFetcher';

export default async function page() {
  async function getRandomTypeAndPokemon() {
    const typesOfPokemon = await fetchRandomPokemonSearchType();
    const typeData = await Promise.all(
      typesOfPokemon.map(async (type) => {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
          const data = await res.json();

          const pokemonsOfType = data.pokemon;
          if (!pokemonsOfType || pokemonsOfType.length === 0) {
            console.warn(`No Pokémon found for type: ${type}`);
            return null;
          }

          const randomIndex = Math.floor(Math.random() * pokemonsOfType.length);
          const selected = pokemonsOfType[randomIndex]?.pokemon;

          if (!selected) {
            console.warn(`Failed to select a Pokémon for type: ${type}`);
            return null;
          }

          const pokemonData = await fetchPokemon(selected.name);
          return { type, randomPokemon: pokemonData };
        } catch (error) {
          console.error(`Error fetching type: ${type}`, error);
          return null;
        }
      })
    );

    return typeData.filter(Boolean);
  }

  const randomTypeData = (await getRandomTypeAndPokemon()).filter((data) => data !== null);

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Suspense fallback={<Spinner />}>
        <PokemonWrapper>
          <Hero />
          <div
          id="explore-section"
          className="flex flex-col justify-center items-center space-y-2 py-8"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            🌟 Discover <span className="text-yellow-500">Pokémon!</span> 🐾
          </h2>

          <div className="flex flex-col items-center gap-4">
          
            <PokemonCard />
            <RandomPokemonSearch randomTypeData={randomTypeData} />
          </div>
        </div>
        </PokemonWrapper>
      </Suspense>
    </div>
  );
}
