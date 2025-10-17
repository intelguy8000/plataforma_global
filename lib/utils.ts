import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency in COP (Colombian Pesos)
export function formatCOP(amount: number): string {
  // For millions, show as "X.XM"
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  // For thousands, show as "X.XK"
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  // Otherwise show full number
  return `$${amount.toLocaleString('es-CO')}`;
}
