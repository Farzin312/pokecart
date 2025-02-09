'use client';

import React, { memo, useState } from 'react';
import PokemonType from './PokemonType';
import { usePokemonContext } from '@/app/context/PokemonContext';
import { PokemonTypeImage } from './PokemonTypeImage';
import Pokemon from '@/app/type/Pokemon';

const PokemonCard = memo(function PokemonCard() {
  const { pokemonList } = usePokemonContext();

  // Group Pokémon by type
  const groupMap: { [key: string]: Pokemon[] } = {};
  pokemonList.forEach((pokemon) => {
    const type = pokemon.type || 'Unknown';
    if (!groupMap[type]) {
      groupMap[type] = [];
    }
    groupMap[type].push(pokemon);
  });

  // Convert to an array of groups
  const groups = Object.entries(groupMap).map(([type, pokemons]) => ({
    type,
    pokemons,
  }));

  // Mobile: Track active group index
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const activeGroup = groups[activeGroupIndex] || { type: 'Unknown', pokemons: [] };
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = () => {
    if (activeGroupIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveGroupIndex(activeGroupIndex - 1);
        setIsAnimating(false);
      }, 300); // Matches animation duration
    }
  };

  const handleNext = () => {
    if (activeGroupIndex < groups.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveGroupIndex(activeGroupIndex + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <>
      {/* Desktop Layout – unchanged */}
      <div className="hidden md:flex flex-col md:flex-row md:justify-center items-center gap-4 w-full">
        {groups.map(({ type, pokemons }) => (
          <div
            key={type}
            className="w-full md:w-[250px] bg-gradient-to-t to-white from-yellow-100 opacity-90 rounded-md shadow-lg p-5 hover:scale-105 hover:opacity-100 transition-transform duration-300"
          >
            <h2 className="text-lg md:text-xl font-semibold capitalize mb-3 text-center flex flex-row items-center justify-center space-x-2">
              <div>Featuring</div>
              <div>
                <PokemonTypeImage imageType={type} />
              </div>
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {pokemons.map((pokemon) => (
                <PokemonType key={pokemon.name} pokemon={pokemon} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Layout – Animated Arrow Navigation */}
      <div className="block md:hidden w-full">
        <div className="relative group">
          {/* Header: Shows active type and its icon */}
          <h2 className="w-full px-4 text-3xl font-bold text-gray-800 mb-4 flex justify-center items-center">
            <span>Featuring</span>
            <span className="ml-2">
              <PokemonTypeImage imageType={activeGroup.type} />
            </span>
          </h2>

          <div className="relative">
            {/* Left Arrow */}
            {activeGroupIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white p-3 rounded-full shadow-lg"
                aria-label="Previous"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Right Arrow */}
            {activeGroupIndex < groups.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white p-3 rounded-full shadow-lg"
                aria-label="Next"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Pokémon List with Slide Animation */}
            <div className="overflow-hidden min-h-[100px] flex items-center justify-center">
              <div
                key={activeGroup.type}
                className={`flex justify-center gap-6 px-4 transition-transform duration-300 transform ${
                  isAnimating ? 'translate-x-6 opacity-50' : 'translate-x-0 opacity-100'
                }`}
                onTransitionEnd={() => setIsAnimating(false)}
              >
                {activeGroup.pokemons.slice(0, 4).map((pokemon) => (
                  <PokemonType key={pokemon.name} pokemon={pokemon} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default PokemonCard;
