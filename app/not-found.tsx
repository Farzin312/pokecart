import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-grow h-full items-center justify-center p-4">
      {/* Pokémon Image */}
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
        alt="Charmander"
        className="w-40 h-40"
      />

      {/* Playful Message */}
      <h1 className="text-3xl font-bold mt-4 text-center">404 - Oops! Page Missing</h1>
      <p className="mt-2 text-xl text-center">
        Charmander says this page got lost on an adventure. Let&apos;s head back home!
      </p>

      {/* Link back to Home */}
      <Link
        href="/"
        className="mt-4 px-6 py-3 bg-yellow-300 text-gray-900 font-bold rounded hover:bg-yellow-200 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
