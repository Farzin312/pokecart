'use client';

import React, { memo } from 'react';
import PokemonType from './PokemonType';
import { usePokemonContext } from '@/app/context/PokemonContext';

const PokemonCard = memo(function PokemonCard() {
  const { pokemonList } = usePokemonContext();

  

  // Group Pokémon by type
  const groupedByType= {};
  pokemonList.forEach((pokemon) => {
    const type = pokemon.type || 'Unknown'; // Ensure there's always a type
    if (!groupedByType[type]) {
      groupedByType[type] = [];
    }
    groupedByType[type].push(pokemon);
  });

  return (
    <div className="flex flex-col md:flex-row md:justify-center gap-4">
      {Object.entries(groupedByType).map(([type, pokemons]) => (
        <div
          key={type}
          className="w-full md:w-[240px] bg-gray-50 opacity-90 rounded-md shadow p-3 hover:scale-105 hover:opacity-100 hover:bg-yellow-50 transition-transform duration-300"
        >
          {/* Type Heading */}
          <h2 className="text-lg md:text-xl font-semibold capitalize mb-3 text-center">{type} Type Pokémon</h2>

          {/* Pokémon Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
            {pokemons.map((pokemon) => (
              <PokemonType key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});



export default PokemonCard;
