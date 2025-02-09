'use client'
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { usePokemonContext } from "@/app/context/PokemonContext"
import { Button } from "./Button"
import { PokemonTypeImage } from "./PokemonTypeImage"
import Pokemon from "../../type/Pokemon"

function PokemonSpotLight() {
    const { randomPokemon } = usePokemonContext()
    const [isHovered, setIsHovered] = useState(false)
    const randPokemon: Pokemon | null = randomPokemon

    if (!randPokemon) return (
        <h1 className="flex justify-center items-center text-xl font-semibold text-gray-700">
            Not Available, come back soon!
        </h1>
    )

    return (
        <div className='relative flex flex-col lg:flex-row items-center justify-center rounded-3xl p-6 hover:scale-105 transition-transform duration-150'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)} >
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
                className="rounded-md transition-transform duration-300 hover:scale-105"
                unoptimized
            />

            {/* Pokémon Info */}
            <div className="flex flex-col items-center justify-center text-gray-800 p-4">
                <h2 className="text-4xl font-extrabold capitalize drop-shadow-md text-gray-900">{randPokemon?.name}</h2>
                <p className="mt-2 text-lg italic text-gray-700">
                    {randPokemon?.name} is known for its <span className="font-semibold">{randPokemon?.abilities?.[0]?.ability?.name || "mystical powers"}!</span>
                </p>
                <h3 className="text-sm mt-1 flex flex-row items-center gap-2">
                    Type: <span className="capitalize font-bold text-gray-900">{randPokemon?.types?.[0]?.type?.name}</span>
                         {randPokemon?.types?.[0]?.type?.name && <PokemonTypeImage imageType={randPokemon.types[0].type.name} />}
                </h3>
                <p className="text-sm">
                    Height: {(randPokemon?.height ?? 0) / 10}m | Weight: {(randPokemon?.weight ?? 0) / 10}kg
                </p>

                <Link href={`/products/${randPokemon.name}`}>
                    <Button className='mt-4 bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold hover:scale-105 transition-transform duration-300'>
                        Catch {randPokemon.name.toUpperCase()} Now! 🔥
                    </Button>
                </Link>
            </div> 
            <>
            <div className={`absolute w-32 h-32 bg-yellow-300 blur-2xl rounded-full top-4 left-4 z-[-1] transition-opacity duration-300 ${isHovered ? "opacity-50 animate-glow-move" : "opacity-0"}`}></div>
            <div className={`absolute w-28 h-28 bg-orange-300 blur-2xl rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[-1] transition-opacity duration-300 ${isHovered ? "opacity-50 animate-glow-move" : "opacity-0"}`}></div>
            <div className={`absolute w-32 h-32 bg-red-400 blur-2xl rounded-full bottom-4 right-4 z-[-1] transition-opacity duration-300 ${isHovered ? "opacity-50 animate-glow-move" : "opacity-0"}`}></div>
        </>
        </div>
    )
}

export default PokemonSpotLight
