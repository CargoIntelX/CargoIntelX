"use client";

import { auth } from "@/firebase/auth";

export default function DashboardPage() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">
        CargoIntelX Dashboard
      </h1>

      <p className="mt-4">
        Welcome:
      </p>

      <p className="font-semibold">
        {auth.currentUser?.email}
      </p>
    </main>
  );
}