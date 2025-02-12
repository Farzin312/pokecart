// app/wishlist/page.tsx
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabaseClient";
import { WishlistPageClient } from "../components";
import { WishlistData } from "../type/Pokemon";
import { getFirebaseUserId } from "@/lib/firebaseAdmin";
import ProtectedRoute from "../context/ProtectedRoute";

export default async function WishlistPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return (
      <div className="h-full min-h-screen w-full flex justify-center items-center">
        Please log in to view your wishlist.
      </div>
    );
  }

  const userId = await getFirebaseUserId(token);

  // recently viewed images (limit 10)
  const { data: recentlyViewedImages } = await supabase
    .from("recently_viewed")
    .select("id, name, sprites")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(10);

  // recently viewed names (limit 100)
  const { data: recentlyViewedNames } = await supabase
    .from("recently_viewed")
    .select("id, name")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(100);

  // wishlist (limit 10)
  const { data: wishlistData } = await supabase
    .from("wishlist")
    .select("id, merchandise_type, pokemon")
    .eq("user_id", userId)
    .limit(10);

  const wishlistDataResponse: WishlistData = {
    recentlyViewed: {
      images: recentlyViewedImages || [],
      names: recentlyViewedNames || [],
    },
    wishlist: (wishlistData || []).map((item) => ({
      id: item.id,
      merchandiseType: item.merchandise_type,
      pokemon: item.pokemon,
    })),
  };

  return (
    <div className="h-full min-h-screen w-full">
      <ProtectedRoute>
        <WishlistPageClient data={wishlistDataResponse} userId={userId} />
      </ProtectedRoute>
    </div>
  );
}
