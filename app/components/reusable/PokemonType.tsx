'use client';

import Image from 'next/image';

interface Pokemon {
  id: number;
  name: string;
  type: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': { front_default: string };
    };
  };
}

function PokemonType({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="p-2 border border-gray-300 rounded-md shadow-sm bg-white flex flex-col items-center hover:scale-105 transition-transform duration-300">
      <Image
        src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
        alt={pokemon.name}
        width={100}
        height={100}
        className="rounded-md"
      />
      <h3 className="text-sm font-semibold capitalize mt-2">{pokemon.name}</h3>
    </div>
  );
}

export default PokemonType;
