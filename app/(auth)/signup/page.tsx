"use client";

import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth } from "@/firebase/auth";

import { db } from "@/firebase/firestore";

import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  async function handleSignup() {
    try {
      setLoading(true);

      setError("");

      const result =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = result.user;

      await sendEmailVerification(user);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,

        fullName,

        email,

        emailVerified: false,

        onboardingState:
          "signup_pending",

        companyId: null,

        createdAt: serverTimestamp(),
      });

      router.push("/verify-email");
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
            Create Account
          </h1>

          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered mt-4"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
          />

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
            onClick={handleSignup}
            disabled={loading}
            className="btn btn-primary mt-4"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>
        </div>
      </div>
    </main>
  );
}