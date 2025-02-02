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
    <Suspense fallback={<Spinner />}>
      <div className="flex items-center justify-center p-4">
        <PokemonWrapper searchQuery={searchQuery}>
          <SearchedPokemon searchQuery={searchQuery} />
        </PokemonWrapper>
      </div>
    </Suspense>
  );
}
