import Pokemon from "../type/Pokemon";

export async function fetchPokemonByType(): Promise<Pokemon[]> {
  try {
    // Fetch all Pokémon types
    const typesResponse = await fetch(`https://pokeapi.co/api/v2/type/`);
    const typesData = await typesResponse.json();
    const allTypes = typesData.results.map((type: { name: string }) => type.name);

    // Filter out types that may cause issues
    const validTypes: string[] = allTypes.filter(
      (type: string) => type !== "unknown" && type !== "shadow"
    );

    // Select three distinct random types
    const selectedTypes: string[] = [];
    while (selectedTypes.length < 3) {
      const randomType = validTypes[Math.floor(Math.random() * validTypes.length)];
      if (!selectedTypes.includes(randomType)) {
        selectedTypes.push(randomType);
      }
    }

    // Fetch 4 Pokémon from each selected type
    const pokemonPromises = selectedTypes.map(async (type) => {
      const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const typeData = await typeResponse.json();

      // Get list of Pokémon from this type
      const availablePokemon: Pokemon[] = typeData.pokemon.map(
        (p: { pokemon: { name: string; url: string } }) => ({
          name: p.pokemon.name,
          url: p.pokemon.url,
        })
      );

      if (availablePokemon.length === 0) return []; // Ensure no empty results

      // Randomly select 4 Pokémon
      const selectedPokemon: Pokemon[] = availablePokemon
        .filter((p) => !!p.url) // Ensure URL exists
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

      // Fetch full Pokémon details
      const fullDetails = await Promise.all(
        selectedPokemon.map(async (pokemon) => {
          try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            if (!response.ok) throw new Error(`Failed to fetch ${pokemon.name}`);
            const details = await response.json();

            return {
              id: details.id,
              name: details.name,
              type,
              types: details.types,
              abilities: details.abilities,
              height: details.height,
              weight: details.weight,
              base_experience: details.base_experience,
              stats: details.stats,
              sprites: details.sprites,
            } as Pokemon;
          } catch (error) {
            console.error(`Error fetching Pokémon details for ${pokemon.name}:`, error);
            return null;
          }
        })
      );

      return fullDetails.filter((p): p is Pokemon => p !== null); // Remove null results
    });

    const pokemonByType = await Promise.all(pokemonPromises);
    return pokemonByType.flat(); // Flatten the results
  } catch (error) {
    console.error("Error fetching Pokémon by type:", error);
    return [];
  }
}


export async function fetchPokemon(name: string): Promise<Pokemon> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error(`Failed to fetch Pokémon: ${name}`);

    const details = await response.json();

    return {
      id: details.id,
      name: details.name,
      types: details.types,
      abilities: details.abilities,
      height: details.height,
      weight: details.weight,
      base_experience: details.base_experience,
      stats: details.stats,
      sprites: details.sprites,
    } as Pokemon;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    throw error;
  }
}
