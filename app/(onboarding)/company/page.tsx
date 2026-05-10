"use client";

import { useState } from "react";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/firestore";

import { auth } from "@/firebase/auth";

import { useRouter } from "next/navigation";

import { v4 as uuidv4 } from "uuid";

export default function CompanyPage() {
  const router = useRouter();

  const [companyName, setCompanyName] =
    useState("");

  const [domain, setDomain] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleCreateCompany() {
    try {
      setLoading(true);

      const user = auth.currentUser;

      if (!user) return;

      const verificationToken =
        uuidv4();

      const companyRef =
        await addDoc(
          collection(db, "companies"),
          {
            companyName,

            domain,

            ownerUid: user.uid,

            verificationToken,

            domainVerified: false,

            createdAt:
              serverTimestamp(),
          }
        );

      await updateDoc(
        doc(db, "users", user.uid),
        {
          companyId:
            companyRef.id,

          onboardingState:
            "domain_pending",
        }
      );

      router.push(
        `/domain?companyId=${companyRef.id}`
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-[500px] bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold">
            Company Setup
          </h1>

          <input
            type="text"
            placeholder="Company Name"
            className="input input-bordered mt-4"
            value={companyName}
            onChange={(e) =>
              setCompanyName(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Domain"
            className="input input-bordered mt-4"
            value={domain}
            onChange={(e) =>
              setDomain(e.target.value)
            }
          />

          <button
            onClick={
              handleCreateCompany
            }
            disabled={loading}
            className="btn btn-primary mt-6"
          >
            {loading
              ? "Creating..."
              : "Continue"}
          </button>
        </div>
      </div>
    </main>
  );
}