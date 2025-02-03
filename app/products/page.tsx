import { Suspense } from "react";
import { SearchedPokemon } from "../components";
import PokemonWrapper from "../wrappers/PokemonWrapper";
import { Spinner } from "../components/reusable";

interface PageProps {
  
  searchParams: Promise<{ pokemon?: string }> | { pokemon?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const searchQuery = resolvedSearchParams.pokemon ?? "";

  return (
      <div className="flex h-full items-center justify-center p-4">
        <Suspense fallback={<Spinner />}>
        <PokemonWrapper searchQuery={searchQuery}>
          <SearchedPokemon searchQuery={searchQuery} />
        </PokemonWrapper> 
        </Suspense>
      </div>
  );
}
