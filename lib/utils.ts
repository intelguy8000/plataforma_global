import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency in COP (Colombian Pesos)
export function formatCOP(amount: number): string {
  // For millions, show as "X,XM" or "XM" (no decimal if .0)
  if (amount >= 1000000) {
    const millions = amount / 1000000;
    const decimal = millions % 1;

    // Si el decimal es 0, no mostrarlo
    if (decimal === 0) {
      return `$${Math.floor(millions)}M`;
    }

    // Si tiene decimal, mostrar con coma (formato colombiano)
    return `$${millions.toFixed(1).replace('.', ',')}M`;
  }

  // For thousands, show as "X,XK" or "XK" (no decimal if .0)
  if (amount >= 1000) {
    const thousands = amount / 1000;
    const decimal = thousands % 1;

    if (decimal === 0) {
      return `$${Math.floor(thousands)}K`;
    }

    return `$${thousands.toFixed(1).replace('.', ',')}K`;
  }

  // Otherwise show full number with Colombian format
  return `$${amount.toLocaleString('es-CO')}`;
}
