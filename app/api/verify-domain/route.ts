import { NextResponse } from "next/server";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/firestore";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const { companyId } = body;

    const companyRef = doc(
      db,
      "companies",
      companyId
    );

    const companySnap =
      await getDoc(companyRef);

    if (!companySnap.exists()) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Company not found",
        },
        { status: 404 }
      );
    }

    const companyData =
      companySnap.data();

    const domain =
      companyData.domain;

    const token =
      companyData.verificationToken;

    const response = await fetch(
      `https://dns.google/resolve?name=${domain}&type=TXT`
    );

    const dnsData =
      await response.json();

    const answers =
      dnsData.Answer || [];

    const verified =
      answers.some((a: any) =>
        a.data.includes(token)
      );

    if (!verified) {
      return NextResponse.json({
        success: false,

        error:
          "TXT record not found",
      });
    }

    await updateDoc(companyRef, {
      domainVerified: true,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,

        error:
          "Verification failed",
      },
      { status: 500 }
    );
  }
}