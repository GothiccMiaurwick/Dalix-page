import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateSlug(text) {
  return text
    .replace(/[^a-z0-9\s]/gi, '')
    .toLowerCase()
    .trim()
    .replaceAll(" ", "-");
}
