import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

export async function POST(request: NextRequest) {
  let body: string;
  try {
    body = await request.text();
  } catch {
    return NextResponse.json({ detail: "طلب غير صالح." }, { status: 400 });
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const userAgent = request.headers.get("user-agent");
  if (userAgent) headers["User-Agent"] = userAgent;

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) headers["X-Forwarded-For"] = forwardedFor;

  try {
    const upstream = await fetch(`${BACKEND_URL.replace(/\/$/, "")}/api/orders`, {
      method: "POST",
      headers,
      body,
      cache: "no-store",
    });

    const responseText = await upstream.text();
    return new NextResponse(responseText, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      {
        detail:
          "تعذر الاتصال بـ Backend. فعّل kuboqss-backend على EasyPanel واضبط BACKEND_URL داخل frontend.",
      },
      { status: 503 },
    );
  }
}
