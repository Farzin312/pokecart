// RandomPokemonSearch.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Button, PokemonType } from './reusable';
import Pokemon from '../type/Pokemon';

interface RandomTypeData {
  type: string;
  randomPokemon: Pokemon; // ideally, type this to your Pokemon type
}

interface RandomPokemonSearchProps {
  randomTypeData: RandomTypeData[];
}

export default function RandomPokemonSearch({ randomTypeData }: RandomPokemonSearchProps) {
  return (
    <div className="flex flex-col gap-4">
      {randomTypeData.map(({ type, randomPokemon }) => (
        <div
          key={type}
          className="w-full md:w-[180px] bg-gradient-to-t to-white from-yellow-100 opacity-90 rounded-md shadow p-2 hover:scale-105 hover:opacity-100 transition-transform duration-300"
        >
          <h2 className="text-base md:text-lg font-semibold capitalize mb-2 text-center">
            {type} Type
          </h2>
          <div className="flex flex-col items-center gap-1">
            {/* Use PokemonType to showcase the Pokémon.
                This component already displays the image and handles the flip effect.
            */}
            <PokemonType pokemon={randomPokemon} />
            <p className="text-xs capitalize font-bold text-center">
              {randomPokemon.name}
            </p>
          </div>
          <div className="flex justify-center mt-2">
            {/* Since your search util only searches by name,
                we link to a search page using the Pokémon's name.
                (If you later create a dedicated type‑search page, update this link accordingly.)
            */}
            <Link href={`/search?pokemon=${randomPokemon.name}`}>
              <Button
                variant="default"
                className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold text-xs transition-transform duration-300"
              >
                See {type}
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
