'use client'
import Image from "next/image"
import Link from "next/link"
import { usePokemonContext } from "@/app/context/PokemonContext"
import { Button } from "./Button"
import Pokemon from "../../type/Pokemon"

function PokemonSpotLight() {
    const { randomPokemon } = usePokemonContext()

    const randPokemon: Pokemon | null = randomPokemon

    if (!randPokemon) return (
        <h1 className="flex justify-center items-center text-xl font-semibold text-gray-700">
            Not Available, come back soon!
        </h1>
    )

    return (
        <div className='relative flex flex-row items-center justify-center bg-gradient-to-tr from-white to-yellow-100 via-yellow-50  rounded-3xl p-6 '>
            
            {/* Pokémon Image */}
            <Image
                src={
                    randPokemon?.sprites?.other?.['official-artwork']?.front_default
                    || randPokemon?.sprites?.front_default
                    || "/fallback-image.jpg"
                }
                alt={randPokemon?.name || "Unknown Pokémon"}
                width={250}
                height={250}
                priority
                className="rounded-md transition-transform duration-300 hover:scale-110"
            />

            {/* Pokémon Info */}
            <div className="flex flex-col items-center justify-center text-gray-800 p-4">
                <h2 className="text-4xl font-extrabold capitalize drop-shadow-md text-gray-900">{randPokemon?.name}</h2>
                <p className="mt-2 text-lg italic text-gray-700">
                    {randPokemon?.name} is known for its <span className="font-semibold">{randPokemon?.abilities?.[0]?.ability?.name || "mystical powers"}!</span>
                </p>
                <p className="text-sm mt-1">
                    Type: <span className="capitalize font-bold text-gray-900">{randPokemon?.types?.[0]?.type?.name}</span>
                </p>
                <p className="text-sm">
                    Height: {(randPokemon?.height ?? 0) / 10}m | Weight: {(randPokemon?.weight ?? 0) / 10}kg
                </p>

                {/* Purchase Button with Navigation */}
                <Link href={`/products/${randPokemon.name}`}>
                    <Button className='mt-4 bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold hover:scale-105 transition-transform duration-300'>
                        Catch {randPokemon.name.toUpperCase()} Now! 🔥
                    </Button>
                </Link>
            </div>         
        </div>
    )
}

export default PokemonSpotLight
