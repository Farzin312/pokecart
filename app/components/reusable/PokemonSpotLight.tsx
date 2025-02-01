'use client'
import Image from "next/image"
import { usePokemonContext } from "@/app/context/PokemonContext"
import { Button } from "./Button"
import Pokemon from "../../type/Pokemon"



function PokemonSpotLight() {
    const { randomPokemon } = usePokemonContext()

    const randPokemon: Pokemon | null = randomPokemon

    if (!randPokemon) return <h1 className="flex justify-center items-center">Not Available, come back soon!</h1>

    return (
      <div className='flex flex-row hover:scale-105 transform transition-transform duration-300 mx-10'>
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
          className="rounded-md"
        />
        <div className="flex flex-col justify-content items-center rounded-md">
            <h2 className="">{randPokemon?.name}</h2>
            <Button className='bg-yellow-300 hover:bg-yellow-500 text-gray-800'>Purchase now!</Button>
        </div>
        </div>
    )
}

export default PokemonSpotLight
