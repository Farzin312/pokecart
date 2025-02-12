export default interface Pokemon {
  id?: number;
  name: string;
  url?: string;
  type?: string;
  types?: { type: { name: string } }[];
  abilities?: { ability: { name: string } }[];
  height?: number;
  weight?: number;
  base_experience?: number;
  stats?: { base_stat: number; stat: { name: string } }[];
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

export interface WishlistItem {
  id: string; // UUID from Supabase
  merchandiseType: string;
  pokemon: Pokemon;
}

export interface WishlistData {
  recentlyViewed: {
    images: Pokemon[]; // Last 10 viewed Pokémon (for images)
    names: Pokemon[];  // Last 100 viewed Pokémon (for names)
  };
  wishlist: WishlistItem[];
}
