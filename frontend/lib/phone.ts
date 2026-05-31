const LIBYA_MOBILE_REGEX = /^\+2189[1-6]\d{7}$/;

export interface NormalizedPhone {
  e164: string;
  digits: string;
  local: string;
}

export function normalizeLibyaPhone(raw: string): NormalizedPhone {
  let phone = raw.replace(/[\s\-\(\)\.]+/g, "").trim();

  if (phone.startsWith("00218")) {
    phone = "+" + phone.slice(2);
  } else if (phone.startsWith("00")) {
    phone = "+" + phone.slice(2);
  } else if (phone.startsWith("218")) {
    phone = "+" + phone;
  } else if (phone.startsWith("0")) {
    phone = "+218" + phone.slice(1);
  }

  if (!LIBYA_MOBILE_REGEX.test(phone)) {
    throw new Error("رقم الهاتف غير صحيح. يرجى إدخال رقم ليبي صحيح.");
  }

  const digits = phone.slice(1);
  const local = "0" + digits.slice(3);
  return { e164: phone, digits, local };
}

export function isValidLibyaPhone(raw: string): boolean {
  try {
    normalizeLibyaPhone(raw);
    return true;
  } catch {
    return false;
  }
}
