'use client'

import { PokemonProvider } from "../context/PokemonContext"

function PokemonWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PokemonProvider>
      {children}
    </PokemonProvider>
  )
}

export default PokemonWrapper