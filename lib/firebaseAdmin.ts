import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
        : undefined,
    }),
  });
}

export async function getFirebaseUserId(token: string): Promise<string> {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    return decodedToken.uid; 
  } catch (error) {
    console.error("❌ Error verifying Firebase token:", error);
    throw new Error("Unauthorized");
  }
}
