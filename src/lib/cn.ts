type ClassValue = string | number | null | false | undefined | ClassValue[];

/**
 * Tiny class-name joiner. Intentionally dependency-free: no clsx/tailwind-merge
 * to keep the client bundle lean. Falsy values are dropped; arrays are flattened.
 */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  for (const v of values) {
    if (!v) continue;
    if (Array.isArray(v)) {
      const inner = cn(...v);
      if (inner) out.push(inner);
    } else {
      out.push(String(v));
    }
  }
  return out.join(' ');
}
