// Configuració central del SEO — font de veritat per a canonicals, OG defaults, schema.
// Si canvies de domini o de marca, només cal tocar aquest fitxer.

export const SITE = {
  url: "https://hostlylabs.com",
  name: "Hostly",
  locale: "es_ES",
  alternateLocales: ["ca_ES"],
  twitter: "@hostlylabs",
  defaultOgImage: "/og-image.png",
  logo: "/hostly-logo.png",
  appUrl: "https://app.hostlylabs.com",
  signupUrl: "https://app.hostlylabs.com/signup",
} as const;

// Construeix una URL absoluta sobre SITE.url, acceptant paths relatius o absoluts.
export function absoluteUrl(path: string): string {
  if (!path) return SITE.url;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = SITE.url.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
