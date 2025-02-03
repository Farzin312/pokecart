'use client'
import { usePokemonContext } from "@/app/context/PokemonContext"

function GlowEffect() {
    const { isHovered } = usePokemonContext();

    return (
        <>
            <div className={`absolute w-32 h-32 bg-yellow-300 blur-2xl rounded-full top-4 left-4 z-[-1] transition-opacity duration-300 ${isHovered ? "opacity-50 animate-glow-move" : "opacity-0"}`}></div>
            <div className={`absolute w-28 h-28 bg-orange-300 blur-2xl rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[-1] transition-opacity duration-300 ${isHovered ? "opacity-50 animate-glow-move" : "opacity-0"}`}></div>
            <div className={`absolute w-32 h-32 bg-red-400 blur-2xl rounded-full bottom-4 right-4 z-[-1] transition-opacity duration-300 ${isHovered ? "opacity-50 animate-glow-move" : "opacity-0"}`}></div>
        </>
    );
}

export default GlowEffect;
