import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateSlug(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Limpiar caracteres no deseados
    .split(/\s+/) // Dividir por espacios
    .join("-"); // Unir con guiones
}
