'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import Pokemon from '@/app/type/Pokemon';
import { Button } from './Button';

interface PokemonDetailsProps {
  selectedPokemon: Pokemon | null;
  similarPokemons: Pokemon[];
}

function PokemonDetails({ selectedPokemon, similarPokemons }: PokemonDetailsProps) {
  const [quantity, setQuantity] = useState(1); // Track quantity for cart

  if (!selectedPokemon)
    return <h1 className="text-center text-gray-500 text-lg">No Pokémon available.</h1>;

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center text-gray-900 p-8 gap-12 md:flex-row">
      {/* Left Section - Pokémon Showcase */}
      <div className="p-8 max-w-xl text-center">
        <h2 className="text-5xl font-extrabold capitalize drop-shadow-md">
          {selectedPokemon.name}
        </h2>

        {/* Pokémon Image */}
        <div className="flex justify-center mt-4 transition-transform duration-300 hover:scale-105">
          <Image
            src={
              selectedPokemon.sprites?.other?.['official-artwork']?.front_default ||
              selectedPokemon.sprites?.front_default ||
              '/images/fallback-image.jpg'
            }
            alt={selectedPokemon.name}
            width={300}
            height={300}
            priority
            className="rounded-lg"
          />
        </div>

        {/* Pokémon Type & Abilities */}
        <p className="mt-2 text-lg font-semibold text-yellow-600">
          Type:{' '}
          <span className="capitalize">
            {selectedPokemon.types?.map((t) => t.type.name).join(', ') || 'Unknown'}
          </span>
        </p>
        <p className="text-lg font-semibold text-yellow-600">
          Abilities:{' '}
          <span className="capitalize">
            {selectedPokemon.abilities?.map((a) => a.ability.name).join(', ') || 'Unknown'}
          </span>
        </p>

        {/* Pokémon Stats - Animated Progress Bars */}
        <div className="mt-6 w-full">
          <h3 className="text-xl font-bold text-gray-700 mb-2">Stats</h3>
          {selectedPokemon.stats?.map((s) => (
            <div key={s.stat.name} className="mb-2">
              <p className="text-gray-600 text-sm">
                {s.stat.name.replace('-', ' ')}: {s.base_stat}
              </p>
              <div className="w-full bg-yellow-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((s.base_stat / 220) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Height & Weight */}
        <p className="mt-3 text-gray-600">
          Height:{' '}
          <span className="font-semibold text-gray-800">{(selectedPokemon.height ?? 0) / 10}m</span> | 
          Weight:{' '}
          <span className="font-semibold text-gray-800">{(selectedPokemon.weight ?? 0) / 10}kg</span>
        </p>
      </div>

      {/* Right Section - Purchase, Cart, and Similar Pokémon */}
      <div className="rounded-lg p-8 max-w-lg flex flex-col items-center">
        {/* Purchase & Cart */}
        <h3 className="text-3xl font-bold text-gray-800">
          Buy {selectedPokemon.name}!
        </h3>
        <p className="text-gray-600 text-md mt-2">
          Limited stock available! Secure yours today. ⚡
        </p>

        {/* Quantity Selector */}
        <div className="mt-6 flex items-center justify-center space-x-4">
          <button
            className="px-3 py-2 bg-yellow-300 text-gray-800 rounded-md hover:bg-yellow-200"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            ➖
          </button>
          <span className="text-lg font-bold">{quantity}</span>
          <button
            className="px-3 py-2 bg-yellow-300 text-gray-800 rounded-md hover:bg-yellow-200"
            onClick={() => setQuantity((q) => q + 1)}
          >
            ➕
          </button>
        </div>

        {/* Price Display */}
        <p className="mt-4 text-2xl font-bold text-yellow-600">
          ${(selectedPokemon.base_experience ?? 50) * quantity}.00
        </p>

        {/* Purchase Buttons */}
        <div className="mt-6 flex flex-col w-full">
          <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-full transition-transform hover:scale-105">
            Add to Cart 🛒
          </Button>
          <Link href={`/checkout/${selectedPokemon.name}`} className="mt-4">
            <Button
              variant="destructive"
              className="w-full font-bold rounded-full transition-transform hover:scale-105"
            >
              Buy Now 🔥
            </Button>
          </Link>
        </div>

        {/* Similar Pokémon List */}
        <div className="mt-8 w-full">
          <h4 className="flex justify-center text-2xl font-bold text-gray-800 mb-4">Similar Pokémon</h4>
          <div className="flex space-x-4 overflow-x-auto">
            {similarPokemons.map((poke) => (
              <Link key={poke.id} href={`/products/${poke.name}`}>
                <div className="min-w-[100px] p-2 border border-gray-200 rounded-lg shadow hover:scale-105 transition-transform">
                  <Image
                    src={
                      poke.sprites?.other?.['official-artwork']?.front_default ||
                      poke.sprites?.front_default ||
                      '/images/fallback-image.jpg'
                    }
                    alt={poke.name}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <p className="text-center text-sm mt-2 capitalize">{poke.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
