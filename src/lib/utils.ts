import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRiskColor(score: number): {
  text: string;
  bg: string;
  border: string;
  gradient: string;
  label: string;
} {
  if (score >= 75) {
    return {
      text: "text-red-500 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-950/30",
      border: "border-red-200 dark:border-red-900/50",
      gradient: "from-red-500 to-rose-600",
      label: "Critical Risk",
    };
  }
  if (score >= 50) {
    return {
      text: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-900/50",
      gradient: "from-amber-500 to-orange-600",
      label: "High Risk",
    };
  }
  if (score >= 25) {
    return {
      text: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-50 dark:bg-yellow-950/30",
      border: "border-yellow-200 dark:border-yellow-900/50",
      gradient: "from-yellow-500 to-amber-500",
      label: "Moderate Risk",
    };
  }
  return {
    text: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-900/50",
    gradient: "from-emerald-500 to-teal-600",
    label: "Low Risk",
  };
}

export function getSeverityBadge(severity: "Critical" | "High" | "Medium" | "Low"): {
  badge: string;
  pill: string;
} {
  switch (severity) {
    case "Critical":
      return {
        badge: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-300 dark:border-red-800",
        pill: "bg-red-500",
      };
    case "High":
      return {
        badge: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 border-orange-300 dark:border-orange-800",
        pill: "bg-orange-500",
      };
    case "Medium":
      return {
        badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-300 dark:border-yellow-800",
        pill: "bg-yellow-500",
      };
    case "Low":
    default:
      return {
        badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300 dark:border-blue-800",
        pill: "bg-blue-500",
      };
  }
}
