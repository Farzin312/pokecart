import { PokemonSpotLight, Button } from "./reusable";
import Link from "next/link";

function Hero() {
  return (
    <section className="w-full m-auto py-10">
      <div className="relative flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto mt-5 px-6">
       
        <div className="flex-1 max-w-md sm:max-w-lg text-center sm:text-left sm:ml-12 sm:bg-gradient-to-bl sm:from-white sm:to-yellow-100  sm:bg-opacity-70 lg:rounded-3xl sm:p-6">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight drop-shadow-lg text-center lg:text-left">
            🎉 Welcome to <span className="text-yellow-500">PokéCart!</span>
          </h1>
          <p className="mt-6 text-xl text-gray-800 leading-relaxed">
            ⚡ Discover <span className="font-bold text-yellow-600">exclusive Pokémon merchandise!</span> The prices shown are just for display — real prices are available on Amazon. 🛒
          </p>
          <p className="mt-4 text-lg text-gray-700">
            ⏳ <span className="font-semibold text-gray-900">Stay tuned!</span> Soon, we’ll have even more accurate pricing as we gain full access to Amazon’s latest data. 🔍✨
          </p>
          {/* Buttons */}
          <div className="mt-6 flex flex-row gap-4 justify-center lg:justify-start">
            <Link href="#explore-section" passHref>
              <Button
                variant="default"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold transition-transform transform hover:scale-105"
              >
                Explore!
              </Button>
            </Link>
            <Link href="/wishlist">
              <Button
                variant="default"
                className="bg-gray-700 hover:bg-gray-600 font-bold text-gray-100 transition-transform transform hover:scale-105"
              >
                Wishlist
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side - Pokémon Spotlight */}
        <div className="flex-1 flex justify-center mt-10 lg:mt-0">
          <PokemonSpotLight />
        </div>
      </div>
    </section>
  );
}

export default Hero;
