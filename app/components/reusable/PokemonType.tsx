'use client';
import { memo, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Spinner from './Spinner';

import Pokemon from '../../type/Pokemon';
import { Button } from './Button';

const PokemonType = memo(function PokemonType({ pokemon }: { pokemon: Pokemon }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const price: number = pokemon.base_experience || 50;

  const memoizedImage = useMemo(() => (
    <Image
      src={
        pokemon.sprites?.other?.['official-artwork']?.front_default ||
        pokemon.sprites?.front_default ||
        '/fallback-image.jpg'
      }
      alt={pokemon.name}
      width={100}
      height={100}
      priority = {false}
      loading='lazy'
      className="rounded-md"
    />
  ), [pokemon]);

  if (!pokemon) return <Spinner />;

  return (
    <li
      className="p-2 border border-gray-300 rounded-md shadow-sm bg-white flex flex-col items-center hover:scale-105 transition-transform duration-300"
      style={{ perspective: '1000px' }} // adds perspective for the 3D effect
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      {/* 
        The inner container now has a relative wrapper without forcing a full height.
        An invisible placeholder forces the container to take the height of the image.
      */}
      <div className="relative w-full">
        {/* Invisible placeholder to force container height */}
        <div className="invisible">
          {memoizedImage}
        </div>
        {/* Flip card container */}
        <div
          className="absolute inset-0"
          style={{
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.6s',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Front side: image */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <Link href={`/products/${pokemon.name}`}>
              {memoizedImage}
            </Link>
          </div>
          {/* Back side: details */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <h2 className="text-xs font-extrabold text-gray-700">
              {pokemon.name.toLocaleUpperCase()}     
            </h2>
            <h3 className="text-sm font-semibold capitalize mt-2">${price}.00</h3>
            <Link href={`/products/${pokemon.name}`}>
              <Button
                variant="default"
                size="sm"
                className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold transition-transform duration-300"
              >
                Catch 🔥
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
});

export default PokemonType;
