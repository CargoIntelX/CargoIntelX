"use client";

import { useState } from "react";

import {
  reload,
  sendEmailVerification,
} from "firebase/auth";

import {
  doc,
  updateDoc,
} from "firebase/firestore";

import { auth } from "@/firebase/auth";

import { db } from "@/firebase/firestore";

import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();

  const user = auth.currentUser;

  const [loading, setLoading] =
    useState(false);

  async function checkVerification() {
    if (!user) return;

    setLoading(true);

    await reload(user);

    if (user.emailVerified) {
      await updateDoc(
        doc(db, "users", user.uid),
        {
          emailVerified: true,

          onboardingState:
            "company_pending",
        }
      );

      router.push("/company");
    }

    setLoading(false);
  }

  async function resendEmail() {
    if (!user) return;

    await sendEmailVerification(
      user
    );

    alert(
      "Verification email sent"
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-[450px] bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold">
            Verify Email
          </h1>

          <p className="mt-2">
            Please verify your email
            before continuing.
          </p>

          <button
            onClick={checkVerification}
            className="btn btn-primary mt-4"
          >
            {loading
              ? "Checking..."
              : "I Verified My Email"}
          </button>

          <button
            onClick={resendEmail}
            className="btn btn-outline mt-2"
          >
            Resend Email
          </button>
        </div>
      </div>
    </main>
  );
}