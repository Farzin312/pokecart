import { NextResponse } from "next/server";

export async function GET() {
  const pokemon = "pikachu"; // Change this to a Pokémon that fails
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch Pokémon" }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
