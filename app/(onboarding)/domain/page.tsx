"use client";

import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/firestore";

import { auth } from "@/firebase/auth";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function DomainPage() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const companyId =
    searchParams.get("companyId");

  const [domain, setDomain] =
    useState("");

  const [token, setToken] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    async function loadCompany() {
      if (!companyId) return;

      const companyRef = doc(
        db,
        "companies",
        companyId
      );

      const snapshot =
        await getDoc(companyRef);

      if (!snapshot.exists()) return;

      const data = snapshot.data();

      setDomain(data.domain);

      setToken(
        data.verificationToken
      );
    }

    loadCompany();
  }, [companyId]);

  async function verifyDomain() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/verify-domain",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            companyId,
          }),
        }
      );

      const result =
        await response.json();

      if (!result.success) {
        alert(result.error);

        return;
      }

      const user =
        auth.currentUser;

      if (!user) return;

      await updateDoc(
        doc(db, "users", user.uid),
        {
          onboardingState:
            "completed",
        }
      );

      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-[650px] bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold">
            Verify Domain
          </h1>

          <p className="mt-4">
            Add this TXT record to:
          </p>

          <div className="bg-base-200 rounded-xl p-4 mt-2">
            <p className="font-semibold">
              {domain}
            </p>
          </div>

          <div className="bg-base-200 rounded-xl p-4 mt-4 font-mono break-all">
            cargointelx-verification=
            {token}
          </div>

          <button
            onClick={verifyDomain}
            disabled={loading}
            className="btn btn-primary mt-6"
          >
            {loading
              ? "Checking DNS..."
              : "Verify Domain"}
          </button>
        </div>
      </div>
    </main>
  );
}