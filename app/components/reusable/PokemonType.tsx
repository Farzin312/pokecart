'use client';

import Pokemon from '../../type/Pokemon';
import Image from 'next/image';
import Link from 'next/link';

function PokemonType({ pokemon }: { pokemon: Pokemon }) {

  return (
    <div className="p-2 border border-gray-300 rounded-md shadow-sm bg-white flex flex-col items-center hover:scale-105 transition-transform duration-300">
      <Link href='/products/[name]' as={`/products/${pokemon.name}`}>
        <Image
          src={
            // Optional chaining for safety in case `sprites` or `other` is missing
            pokemon.sprites?.other?.['official-artwork']?.front_default
            || pokemon.sprites?.front_default
            || '/fallback-image.jpg'  // fallback
          }
          alt={pokemon.name}
          width={100}
          height={100}
          priority
          className="rounded-md"
        />
      </Link>
      <h3 className="text-sm font-semibold capitalize mt-2">{pokemon.name}</h3>
    </div>
  );
}

export default PokemonType;
