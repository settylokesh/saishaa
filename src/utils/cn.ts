type ClassValue = string | number | boolean | null | undefined | ClassValue[];

/**
 * Utility function to merge class names
 * Simple implementation without clsx dependency
 */
export function cn(...inputs: ClassValue[]): string {
  const flatten = (arr: ClassValue[]): string[] => {
    const result: string[] = [];
    for (const item of arr) {
      if (typeof item === 'string' && item.trim() !== '') {
        result.push(item);
      } else if (Array.isArray(item)) {
        result.push(...flatten(item));
      }
    }
    return result;
  };
  return flatten(inputs).join(' ').trim();
}

/**
 * Format price to display currency
 */
export function formatPrice(price: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if WebGL is supported
 */
export function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}
