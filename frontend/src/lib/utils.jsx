import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
};

export function getTabTitle(pathname) {
  if (pathname === "/") return "MediCare";

  const parts = pathname.split("/").filter(Boolean); // remove empty strings
  const capitalized = parts.map(
    (part) => part.charAt(0).toUpperCase() + part.slice(1)
  );

  return `${capitalized.reverse().join(" - ")} - MediCare`;
}