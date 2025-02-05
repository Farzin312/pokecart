'use client';

import React from 'react';
import Link from 'next/link';
import { Button, PokemonType } from './reusable';
import Pokemon from '../type/Pokemon';

interface RandomTypeData {
  type: string;
  randomPokemon: Pokemon;
}

interface RandomPokemonSearchProps {
  randomTypeData: RandomTypeData[];
}

export default function RandomPokemonSearch({ randomTypeData }: RandomPokemonSearchProps) {
  return (
    <div className="flex flex-row justify-center gap-4">
      {randomTypeData.map(({ type, randomPokemon }) => (
        <div
          key={type}
          className="w-full md:w-[180px] bg-gradient-to-t to-white from-yellow-100 opacity-90 rounded-md shadow p-2 hover:scale-105 hover:opacity-100 transition-transform duration-300 "
        >
          <h2 className="text-base md:text-lg font-semibold capitalize mb-2 text-center">
            {type} Type
          </h2>
          <div className="flex flex-col items-center gap-1">
            <PokemonType pokemon={randomPokemon} />
          </div>
          <div className="flex justify-center mt-2">
            {/* Link now uses the type filter so the search page can return all Pokémon of that type */}
            <Link href={`/products?type=${encodeURIComponent(type)}`}>
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
