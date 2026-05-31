export type TrackingPayload = {
  eventId: string;
  value?: number;
  currency?: string;
  contentIds?: string[];
  contentName?: string;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track?: (...args: unknown[]) => void };
    snaptr?: (...args: unknown[]) => void;
  }
}

export function createEventId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}

function getCookie(name: string) {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : "";
}

export function readAttribution() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    landing_page: window.location.href,
    referrer: document.referrer,
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
    fbclid: params.get("fbclid") || "",
    fbc: getCookie("_fbc"),
    fbp: getCookie("_fbp"),
    ttclid: params.get("ttclid") || "",
    ttp: getCookie("_ttp"),
    snapclid: params.get("ScCid") || params.get("snapclid") || "",
  };
}

export function trackBrowserEvent(name: "ViewContent" | "AddToCart" | "InitiateCheckout" | "Purchase", payload: TrackingPayload) {
  if (typeof window === "undefined") return;

  const metaPayload = {
    value: payload.value,
    currency: payload.currency || "LYD",
    content_ids: payload.contentIds,
    content_name: payload.contentName,
  };

  window.fbq?.("track", name, metaPayload, { eventID: payload.eventId });
  window.ttq?.track?.(name === "Purchase" ? "CompletePayment" : name, {
    value: payload.value,
    currency: payload.currency || "LYD",
    content_id: payload.contentIds?.join(","),
    event_id: payload.eventId,
  });
  window.snaptr?.("track", name === "Purchase" ? "PURCHASE" : name.toUpperCase(), {
    price: payload.value,
    currency: payload.currency || "LYD",
    item_ids: payload.contentIds,
    client_dedup_id: payload.eventId,
  });
}
