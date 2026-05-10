"use client";

import { useState } from "react";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/firebase/auth";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      setLoading(true);

      setError("");

      const result =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      if (
        !result.user.emailVerified
      ) {
        router.push("/verify-email");

        return;
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-[420px] bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold">
            CargoIntelX
          </h1>

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered mt-4"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered mt-4"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="btn btn-primary mt-4"
          >
            {loading
              ? "Signing In..."
              : "Continue"}
          </button>
        </div>
      </div>
    </main>
  );
}