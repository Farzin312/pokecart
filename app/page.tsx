import { PokemonSection } from './components';
import PokemonWrapper from './wrappers/PokemonWrapper';

function page() {
  return (
    <div className="h-full grid grid-rows-6 items-center justify-center">
      {/* Empty row to push content slightly lower */}
      <div className="row-span-2"></div>
      
      {/* PokemonSection positioned lower */}
      <div className="row-span-4 z-10">
        <PokemonWrapper>
          <PokemonSection />
        </PokemonWrapper>
      </div>
    </div>
  );
}

export default page;
