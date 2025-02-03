"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import Link from "next/link";

import { Spinner, Button, Modal } from "../../components/reusable";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null); // Modal state
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/auth/login"), 2000); // Redirect after 2s
    } catch {
      setMessage("Failed to register. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Show Modal if message exists */}
      {message && <Modal message={message} onClose={() => setMessage(null)} />}

      <div className="w-full max-w-md p-8 space-y-6 bg-gradient-to-tr from-white to-yellow-100 via-yellow-50 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Register</h2>

        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <form onSubmit={handleRegister} className="space-y-4">
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
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <Button
                onClick={handleRegister}
                variant="default"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-white font-bold rounded-md transition"
              >
                Register
              </Button>
            </form>
          </>
        )}

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-yellow-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
