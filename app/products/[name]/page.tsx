import { Suspense } from "react";
import PokemonDetails from "@/app/components/reusable/PokemonDetails"; 
import PokemonWrapper from "../../wrappers/PokemonWrapper";
import { fetchPokemon } from "../../utils/pokemonFetcher";
import { Spinner } from "@/app/components/reusable";
import Pokemon from "../../type/Pokemon";

type PageProps = {
  params: Promise<{ name: string }>
};

async function Page({ params }: PageProps) {
  const { name } = await params;
  const pokemon: Pokemon = await fetchPokemon(name);
  if (!pokemon) return <p>Pokémon not found</p>;

  return (
    <div className="flex justify-center items-center">
      <Suspense fallback={<Spinner />}>
        <PokemonWrapper>
          <PokemonDetails selectedPokemon={pokemon} />
        </PokemonWrapper>
      </Suspense>
    </div>
  );
}

export default Page;
