'use client'
import { Suspense } from 'react'

import { PokemonCard, Spinner } from "./reusable"

function PokemonSection() {
  return (
    <Suspense fallback={<Spinner />}>
        <PokemonCard />
    </Suspense>
  )
}

export default PokemonSection