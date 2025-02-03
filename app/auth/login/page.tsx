"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebaseConfig";

import { Spinner, Button, Modal } from "../../components/reusable";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null); 
  const router = useRouter();

  // Email Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful! Redirecting..."); 
      setTimeout(() => router.push("/"), 2000); 
    } catch {
      setMessage("Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      setMessage("Google Login successful! Redirecting..."); // Show modal
      setTimeout(() => router.push("/"), 2000); // Redirect after 2s
    } catch {
      setMessage("Google Sign-In failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Show Modal if message exists */}
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
