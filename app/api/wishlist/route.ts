import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { userId, merchandiseType, pokemon } = await request.json();
    if (!userId || !merchandiseType || !pokemon) {
      return NextResponse.json(
        { error: "Missing userId, merchandiseType, or pokemon" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("wishlist").insert([
      {
        user_id: userId,
        merchandise_type: merchandiseType,
        pokemon,
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ message: "Wishlist item added successfully" });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { itemId } = await request.json();
    if (!itemId) {
      return NextResponse.json({ error: "Missing itemId" }, { status: 400 });
    }

    const { error } = await supabase.from("wishlist").delete().eq("id", itemId);
    if (error) throw error;

    return NextResponse.json({ message: "Wishlist item deleted" });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { itemId, newMerchandiseType } = await request.json();
    if (!itemId || !newMerchandiseType) {
      return NextResponse.json(
        { error: "Missing itemId or newMerchandiseType" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("wishlist")
      .update({ merchandise_type: newMerchandiseType })
      .eq("id", itemId);

    if (error) throw error;

    return NextResponse.json({ message: "Wishlist item updated" });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
