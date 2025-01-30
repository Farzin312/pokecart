'use client';

import Image from 'next/image';

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': { front_default: string };
    };
  };
  abilities: { ability: { name: string } }[];
  height: number;
  weight: number;
  base_experience: number;
  stats: { base_stat: number; stat: { name: string } }[];
}

function PokemonDetails({ pokemon }: { pokemon: Pokemon }) {
  return (
    <li className="p-4 border border-gray-300 rounded-md shadow-md max-w-sm bg-white">
      <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>

      {/* Pokémon Image */}
        <Image
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          width={150}
          height={150}
          priority
          className="rounded-md"
        />

      {/* Pokémon Details */}
      <p><strong>Type:</strong> {pokemon.types.map((t) => t.type.name).join(', ')}</p>
      <p><strong>Abilities:</strong> {pokemon.abilities.map((a) => a.ability.name).join(', ')}</p>
      <p><strong>Height:</strong> {pokemon.height / 10} m</p>
      <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
      <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>

      {/* Pokémon Stats */}
      <p><strong>Stats:</strong></p>
      <ul>
        {pokemon.stats.map((s) => (
          <li key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>
        ))}
      </ul>
    </li>
  );
}

export default PokemonDetails;
