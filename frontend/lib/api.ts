const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.kuboqss.com";

function parseFastApiDetail(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const detail = (body as { detail?: unknown }).detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    const messages = detail
      .map((item) => {
        if (item && typeof item === "object" && "msg" in item) {
          return String((item as { msg: unknown }).msg);
        }
        return null;
      })
      .filter(Boolean);
    return messages.length > 0 ? messages.join(" · ") : null;
  }
  return null;
}

function mapHttpError(status: number, fallback?: string | null): string {
  if (fallback) return fallback;
  if (status === 404) {
    return "خدمة الطلبات غير متوفرة. Backend ما زال غير مفعّل على api.kuboqss.com.";
  }
  if (status === 422) return "بيانات الطلب غير صحيحة. تأكدي من الاسم ورقم الهاتف.";
  if (status === 503) return "تعذر الاتصال بخادم الطلبات. Backend غير شغّال حالياً.";
  if (status >= 500) return "خطأ في الخادم. حاولي بعد قليل أو تواصلي معنا.";
  return "فشل إرسال الطلب.";
}

async function readErrorMessage(res: Response): Promise<string> {
  const body = await res.json().catch(() => null);
  return mapHttpError(res.status, parseFastApiDetail(body));
}

export async function fetchProducts() {
  const res = await fetch(`${PUBLIC_API_URL}/api/products`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProduct(slug: string) {
  const res = await fetch(`${PUBLIC_API_URL}/api/products/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

/** Orders go through Next.js proxy (/api/orders) to avoid CORS and use internal BACKEND_URL on deploy. */
export async function submitOrder(payload: object) {
  let res: Response;
  try {
    res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("تعذر الاتصال بالمتجر. تحققي من الإنترنت أو أن Backend مفعّل على السيرفر.");
  }

  if (!res.ok) {
    throw new Error(await readErrorMessage(res));
  }

  return res.json();
}

export async function sendServerEvent(eventType: string, payload: object) {
  try {
    await fetch(`${PUBLIC_API_URL}/api/events/${eventType}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Non-blocking
  }
}
