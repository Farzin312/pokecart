export default interface Pokemon {
    id?: number;
    name: string;
    url?: string;
  
    // Single-type property (used in PokemonType.tsx)
    type?: string;
  
    // Full type list (used in PokemonDetails.tsx)
    types?: { type: { name: string } }[];
  
    // More detailed info
    abilities?: { ability: { name: string } }[];
    height?: number;
    weight?: number;
    base_experience?: number;
    stats?: { base_stat: number; stat: { name: string } }[];
  
    // Sprites
    sprites?: {
      front_default?: string;
      front_shiny?: string;
      other?: {
        'official-artwork'?: {
          front_default?: string;
        };
      };
    };
  }