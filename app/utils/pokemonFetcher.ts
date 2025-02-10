import Pokemon from "../type/Pokemon";
import pokemonTypes from "../data/pokemonTypes.json"; 
import pokemonNames from "../data/pokemonNames.json"; 


function getRandomItems<T>(array: T[], count: number): T[] {
  const copy = [...array];
  const selected: T[] = [];
  while (selected.length < count && copy.length > 0) {
    const index = Math.floor(Math.random() * copy.length);
    selected.push(copy.splice(index, 1)[0]);
  }
  return selected;
}

export function fetchPokemonTypes(): string[] {
  return (pokemonTypes.types as string[]).filter(
    (type) => type !== "unknown" && type !== "shadow"
  );
}

export async function fetchPokemonByType(): Promise<Pokemon[]> {
  try {
    const validTypes: string[] = fetchPokemonTypes();

    const selectedTypes = getRandomItems(validTypes, 4);
    const pokemonPromises = selectedTypes.map(async (type) => {
    const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const typeData = await typeResponse.json();

    const availablePokemon: Pokemon[] = typeData.pokemon.map(
        (p: { pokemon: { name: string; url: string } }) => ({
          name: p.pokemon.name,
          url: p.pokemon.url,
        })
      );

      if (availablePokemon.length === 0) return []; 

      const selectedPokemon: Pokemon[] = availablePokemon
        .filter((p) => !!p.url)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

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

      return fullDetails.filter((p): p is Pokemon => p !== null);
    });

    const pokemonByType = await Promise.all(pokemonPromises);
    return pokemonByType.flat();
  } catch (error) {
    console.error("Error fetching Pokémon by type:", error);
    return [];
  }
}

export async function fetchRandomPokemonSearchType(): Promise<string[]> {
  const validTypes = fetchPokemonTypes();
  // Randomly select 3 distinct types.
  return getRandomItems(validTypes, 3);
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

export async function fetchAllPokemon(): Promise<Partial<Pokemon>[]> {
  try {
    const namesArray = pokemonNames as string[];

    const pokemonDetails = await Promise.all(
      namesArray.map(async (name: string) => {
        try {
          const detailsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          if (!detailsResponse.ok) throw new Error(`Failed to fetch ${name}`);
          const detailsData = await detailsResponse.json();

          return {
            name: detailsData.name,
            sprites: detailsData.sprites,
            types: detailsData.types.map((t: { type: { name: string } }) => t),
          };
        } catch (error) {
          console.error(`Error fetching details for ${name}:`, error);
          return null;
        }
      })
    );
    return pokemonDetails.filter((p): p is { name: string; sprites: { [key: string]: string }; types: { type: { name: string } }[] } => p !== null);
  } catch (error) {
    console.error("Error fetching all Pokémon:", error);
    return [];
  }
}

export async function fetchRecommendedPokemon(
  selectedPokemon: Pokemon,
  limit: number = 10
): Promise<Pokemon[]> {
  try {
    if (!selectedPokemon || !selectedPokemon.types) return [];

    const types = selectedPokemon.types.map(
      (t: { type: { name: string } }) => t.type.name
    );

    const pokemonPromises = types.map(async (type) => {
      const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const typeData = await typeResponse.json();
      const availablePokemon = typeData.pokemon.map(
        (p: { pokemon: { name: string; url: string } }) => ({
          name: p.pokemon.name,
          url: p.pokemon.url,
        })
      );
      return availablePokemon;
    });

    const pokemonByTypes = await Promise.all(pokemonPromises);
    let recommendedList = pokemonByTypes.flat();

    recommendedList = recommendedList.filter((p) => p.name !== selectedPokemon.name);

    const uniqueMap: { [key: string]: { name: string; url: string } } = {};
    recommendedList.forEach((p) => {
      uniqueMap[p.name] = p;
    });
    const uniqueRecommended = Object.values(uniqueMap);

    const shuffled = uniqueRecommended.sort(() => 0.5 - Math.random());
    const selectedRecommended = shuffled.slice(0, limit);

    const fullDetails = await Promise.all(
      selectedRecommended.map(async (pokemon) => {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          if (!response.ok) throw new Error(`Failed to fetch ${pokemon.name}`);
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
          console.error(`Error fetching Pokémon details for ${pokemon.name}:`, error);
          return null;
        }
      })
    );
    return fullDetails.filter((p): p is Pokemon => p !== null);
  } catch (error) {
    console.error("Error fetching recommended Pokémon:", error);
    return [];
  }
}

export async function fetchPokemonBySearch(
  query: string,
  typeFilter?: string
): Promise<Pokemon[]> {
  try {
    if (typeFilter) {
      const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${typeFilter}`);
      const typeData = await typeResponse.json();

      const availablePokemon: { name: string; url: string }[] = typeData.pokemon.map(
        (p: { pokemon: { name: string; url: string } }) => ({
          name: p.pokemon.name,
          url: p.pokemon.url,
        })
      );

      const normalizedQuery = query.toLowerCase();
      const filtered = query
        ? availablePokemon.filter((p) => p.name.toLowerCase().startsWith(normalizedQuery))
        : availablePokemon;

      const limited = filtered.slice(0); // you can adjust the limit as needed

      const pokemonDetails = await Promise.all(
        limited.map(async (pokemon) => {
          try {
            const detailsResponse = await fetch(pokemon.url);
            if (!detailsResponse.ok) throw new Error(`Failed to fetch ${pokemon.name}`);
            const detailsData = await detailsResponse.json();
            return {
              id: detailsData.id,
              name: detailsData.name,
              sprites: detailsData.sprites,
              types: detailsData.types.map((t: { type: { name: string } }) => t.type.name),
            } as Pokemon;
          } catch (error) {
            console.error(`Error fetching details for ${pokemon.name}:`, error);
            return null;
          }
        })
      );
      return pokemonDetails.filter((p): p is Pokemon => p !== null);
    } else {
      const data = {
        results: (pokemonNames as string[]).map((name) => ({
          name,
          url: `https://pokeapi.co/api/v2/pokemon/${name}`,
        })),
      };
      const normalizedQuery = query.toLowerCase();
      const filtered = data.results.filter((pokemon: { name: string; url: string }) =>
        pokemon.name.toLowerCase().startsWith(normalizedQuery)
      );
      const limited = filtered.slice(0, 20);
      const pokemonDetails = await Promise.all(
        limited.map(async (pokemon: { name: string; url: string }) => {
          try {
            const detailsResponse = await fetch(pokemon.url);
            if (!detailsResponse.ok) throw new Error(`Failed to fetch ${pokemon.name}`);
            const detailsData = await detailsResponse.json();
            return {
              id: detailsData.id,
              name: detailsData.name,
              sprites: detailsData.sprites,
              types: detailsData.types.map((t: { type: { name: string } }) => t.type.name),
            } as Pokemon;
          } catch (error) {
            console.error(`Error fetching details for ${pokemon.name}:`, error);
            return null;
          }
        })
      );
      return pokemonDetails.filter((p): p is Pokemon => p !== null);
    }
  } catch (error) {
    console.error("Error in fetchPokemonBySearch:", error);
    return [];
  }
}
