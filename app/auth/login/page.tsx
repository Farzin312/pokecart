"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { auth, googleProvider } from "@/firebaseConfig";
import { Spinner, Button, Modal } from "../../components/reusable";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  // Email & Password Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await setAuthCookie(userCredential);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      console.error(error);
      setMessage("Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      await setAuthCookie(userCredential);
      setMessage("Google Login successful! Redirecting...");
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      console.error(error);
      setMessage("Google Sign-In failed. Try again.");
      setLoading(false);
    }
  };
  
  const setAuthCookie = async (userCredential: UserCredential) => {
    const user = userCredential.user;
    if (!user) return;

    const token = await user.getIdToken(true);

    const isLocalhost = typeof window !== "undefined" &&
      window.location.hostname === "localhost";

    const maxAge = 86400; 

    if (isLocalhost) {
      // Local dev over HTTP
      document.cookie = `token=${token}; Path=/; Max-Age=${maxAge}; SameSite=Lax;`;
    } else {
      // Production, served over HTTPS (e.g. https://pokemon.org)
      document.cookie = `token=${token}; Path=/; Max-Age=${maxAge}; Secure; SameSite=None;`;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {message && <Modal message={message} onClose={() => setMessage(null)} />}

      <div className="w-full max-w-md p-8 space-y-6 bg-gradient-to-tr from-white to-yellow-100 via-yellow-50 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <Button
                variant="default"
                onClick={handleLogin}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-white font-bold transition"
              >
                Login
              </Button>
            </form>

            <Button
              variant="destructive"
              onClick={handleGoogleLogin}
              className="w-full text-white font-bold transition"
            >
              Sign in with Google
            </Button>
          </>
        )}

        <p className="text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-yellow-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
