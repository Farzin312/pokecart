import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { userId, pokemon } = await request.json();
    if (!userId || !pokemon) {
      return NextResponse.json(
        { error: "Missing userId or pokemon data" },
        { status: 400 }
      );
    }

    // Upsert row for user + pokemon
    const { error } = await supabase
      .from("recently_viewed")
      .upsert(
        [
          {
            user_id: userId,
            pokemon_id: pokemon.id,
            name: pokemon.name,
            sprites: pokemon.sprites, // store the image
          },
        ],
        { onConflict: "user_id,pokemon_id" }
      );

    if (error) throw error;

    // Now ensure we keep only the 10 most recent images
    // 1) Grab all rows with user_id = userId AND sprites is not null
    const { data: imageRows, error: fetchError } = await supabase
      .from("recently_viewed")
      .select("id, created_at")
      .eq("user_id", userId)
      .not("sprites", "is", null)
      .order("created_at", { ascending: false });

    if (fetchError) throw fetchError;

    // 2) If we have more than 10, set sprites = null for the oldest
    if (imageRows && imageRows.length > 10) {
      // slice(10) = everything after the first 10
      const extra = imageRows.slice(10);
      const extraIds = extra.map((row) => row.id);
      // set sprites to null
      await supabase
        .from("recently_viewed")
        .update({ sprites: null })
        .in("id", extraIds);
    }

    return NextResponse.json({
      message: "Recently viewed added (or already existed). Oldest images removed if > 10.",
    });
  } catch (error) {
    console.error("❌ Error adding recently viewed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId, pokemonId } = await request.json();
    if (!userId || !pokemonId) {
      return NextResponse.json(
        { error: "Missing userId or pokemonId" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("recently_viewed")
      .delete()
      .eq("user_id", userId)
      .eq("pokemon_id", pokemonId);

    if (error) throw error;
    return NextResponse.json({ message: "Recently viewed item deleted" });
  } catch (error) {
    console.error("❌ Error deleting recently viewed item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { userId, pokemonId, newName, newSprites } = await request.json();
    if (!userId || !pokemonId) {
      return NextResponse.json(
        { error: "Missing userId or pokemonId" },
        { status: 400 }
      );
    }

    const updateData: { name?: string; sprites?: Record<string, unknown> | null } = {};
    if (newName) updateData.name = newName;
    if (newSprites !== undefined) updateData.sprites = newSprites;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No update fields provided" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("recently_viewed")
      .update(updateData)
      .eq("user_id", userId)
      .eq("pokemon_id", pokemonId);

    if (error) throw error;
    return NextResponse.json({ message: "Recently viewed item updated" });
  } catch (error) {
    console.error("❌ Error updating recently viewed item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
