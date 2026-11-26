import { NextResponse } from "next/server";

interface OnboardingPayload {
  service?: string;
  market?: "india" | "international";
  budget?: string;
  timeline?: string;
  problem?: string;
  name?: string;
  email?: string;
  company?: string;
  websiteTrap?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OnboardingPayload;

    // Silent honeypot check to drop automated spam
    if (body.websiteTrap && body.websiteTrap.trim().length > 0) {
      return NextResponse.json({
        ok: true,
        ticketId: "MC-00000",
        receivedAt: new Date().toISOString(),
      });
    }

    const name = (body.name ?? "").trim().slice(0, 120);
    const email = (body.email ?? "").trim().slice(0, 180);
    const problem = (body.problem ?? "").trim().slice(0, 4000);
    const company = (body.company ?? "").trim().slice(0, 160);

    if (!name || !EMAIL_RE.test(email) || problem.length < 10) {
      return NextResponse.json(
        {
          error:
            "Please enter your name, a valid work email, and at least a short sentence describing the problem or build.",
        },
        { status: 400 }
      );
    }

    const ticketId = `MC-${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`;

    return NextResponse.json({
      ok: true,
      ticketId,
      receivedAt: new Date().toISOString(),
      summary: {
        service: body.service || "custom-engineering",
        market: body.market || "international",
        budget: body.budget || "To be scoped",
        timeline: body.timeline || "Flexible",
        name,
        email,
        company: company || "Independent",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to parse request payload." },
      { status: 400 }
    );
  }
}
