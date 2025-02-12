import { NextResponse } from "next/server";
import { getFirebaseUserId } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }

    const userId = await getFirebaseUserId(token);

    return NextResponse.json({ userId });
  } catch (error) {
    console.error("❌ Error verifying Firebase token:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
