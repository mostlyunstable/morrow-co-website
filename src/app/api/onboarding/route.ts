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
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OnboardingPayload;

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const problem = body.problem?.trim() ?? "";

    if (!name || !email || !email.includes("@") || problem.length < 10) {
      return NextResponse.json(
        {
          error:
            "Please provide your name, a valid email address, and a brief description of your problem or project.",
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
        company: body.company?.trim() || "Independent",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to parse request payload." },
      { status: 400 }
    );
  }
}
