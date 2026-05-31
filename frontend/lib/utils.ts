import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLyd(value: number) {
  return `${value.toLocaleString("ar-LY")} د.ل`;
}
