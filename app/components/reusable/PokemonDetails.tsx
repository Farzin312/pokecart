
import Image from 'next/image';
import Pokemon from '@/app/type/Pokemon';

function PokemonDetails({ selectedPokemon }: { selectedPokemon: Pokemon | null }) {
  // If there's no selected Pokémon, return `null`
  if (!selectedPokemon) {
    return null;
  }

  return (
    <li className="p-4 border border-gray-300 rounded-md shadow-md max-w-sm bg-white list-none">
      <h2 className="text-xl font-bold capitalize">{selectedPokemon.name ?? "Unknown Pokémon"}</h2>

      {/* Pokémon Image */}
      <Image
        src={
          selectedPokemon.sprites?.other?.['official-artwork']?.front_default
          || selectedPokemon.sprites?.front_default
          || "/images/fallback-image.jpg"
        }
        alt={selectedPokemon.name ?? "Unknown Pokémon"}
        width={150}
        height={150}
        priority
        className="rounded-md"
      />

      {/* Pokémon Details */}
      <p>
        <strong>Type:</strong>{" "}
        {selectedPokemon.types?.map((t, index) => (
          <span key={index}>
            {t.type.name}
            {index < (selectedPokemon.types?.length ?? 0) - 1 ? ', ' : ''}
          </span>
        )) ?? <span>None</span>}
      </p>
      <p>
        <strong>Abilities:</strong>{" "}
        {selectedPokemon.abilities?.map((a, index) => (
          <span key={index}>
            {a.ability.name}
            {index < (selectedPokemon.abilities?.length ?? 0) - 1 ? ', ' : ''}
          </span>
        )) ?? <span>None</span>}
      </p>
      <p>
        <strong>Height:</strong>{" "}
        {selectedPokemon.height != null
          ? (selectedPokemon.height / 10).toFixed(1)
          : "Unknown"} m
      </p>
      <p>
        <strong>Weight:</strong>{" "}
        {selectedPokemon.weight != null
          ? (selectedPokemon.weight / 10).toFixed(1)
          : "Unknown"} kg
      </p>
      <p>
        <strong>Base Experience:</strong>{" "}
        {selectedPokemon.base_experience ?? "Unknown"}
      </p>

      {/* Pokémon Stats */}
      <p>
        <strong>Stats:</strong>
      </p>
      <ul>
        {selectedPokemon.stats?.map(s => (
          <li key={s.stat.name}>
            {s.stat.name}: {s.base_stat}
          </li>
        )) ?? <li>None</li>}
      </ul>
    </li>
  );
}

export default PokemonDetails;
