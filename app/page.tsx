import { Suspense } from 'react';

import { PokemonCard, PokemonSpotLight, Spinner } from './components/reusable';
import PokemonWrapper from './wrappers/PokemonWrapper';

function page() {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Suspense fallback={<Spinner />}>
        <PokemonWrapper>
          <PokemonSpotLight />
          <PokemonCard />
        </PokemonWrapper>  
      </Suspense>
    </div>
  );
}

export default page;
