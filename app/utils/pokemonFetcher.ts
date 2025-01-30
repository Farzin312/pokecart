export async function fetchPokemonByType() {
  try {
    // Fetch all Pokémon types
    const typesResponse = await fetch(`https://pokeapi.co/api/v2/type/`);
    const typesData = await typesResponse.json();
    const allTypes = typesData.results.map((type: { name: string }) => type.name);

    // Select three distinct random types
    const selectedTypes: string[] = [];
    while (selectedTypes.length < 3) {
      const randomType = allTypes[Math.floor(Math.random() * allTypes.length)];
      if (!selectedTypes.includes(randomType)) {
        selectedTypes.push(randomType);
      }
    }

    // Fetch 4 Pokémon from each selected type
    const pokemonPromises = selectedTypes.map(async (type) => {
      const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const typeData = await typeResponse.json();

      // Get list of Pokémon from this type
      const availablePokemon = typeData.pokemon.map((p: { pokemon: { name: string; url: string } }) => p.pokemon);

      if (availablePokemon.length < 4) return availablePokemon; // If fewer than 4 exist, return all

      // Randomly select 4 Pokémon from this type
      const selectedPokemon = availablePokemon.sort(() => 0.5 - Math.random()).slice(0, 4);

      // Fetch full Pokémon details from `/api/v2/pokemon/{name}`
      const fullDetails = await Promise.all(
        selectedPokemon.map(async (pokemon: { name: string; url: string }) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          const details = await response.json();
          return {
            id: details.id,
            name: details.name,
            type, // Store the type name
            sprites: details.sprites, // Get the image sprites
          };
        })
      );

      return fullDetails;
    });

    // Resolve all promises and flatten into a single array
    const pokemonGroups = await Promise.all(pokemonPromises);
    return pokemonGroups.flat();
  } catch (error) {
    console.error("Failed to fetch Pokémon by type:", error);
    throw new Error("Failed to fetch Pokémon by type");
  }
}

  
  
  export async function fetchPokemon(name: string) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return response.json();
    } catch {
        throw new Error("Failed to fetch Pokémon");
    }
    
  }
  