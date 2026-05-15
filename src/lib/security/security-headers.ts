/**
 * Bas-headers för minskad yta för clickjacking, MIME-sniffing och läckage via referrer.
 * CSP är avvägd mot Next/Turbopack: `unsafe-inline` för stilar behövs idag; skärp med nonces senare.
 */
export function applySecurityHeaders(response: Response): Response {
  const h = response.headers;
  h.set("X-Content-Type-Options", "nosniff");
  h.set("X-Frame-Options", "DENY");
  h.set("Referrer-Policy", "strict-origin-when-cross-origin");
  h.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  h.set("Cross-Origin-Opener-Policy", "same-origin");

  const isProd = process.env.NODE_ENV === "production";
  const scriptSrc = isProd ? "'self' 'unsafe-inline'" : "'self' 'unsafe-inline' 'unsafe-eval'";
  const parts = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'none'",
    "form-action 'self'",
  ];
  if (isProd) {
    parts.push("upgrade-insecure-requests");
  }
  h.set("Content-Security-Policy", parts.join("; "));

  if (isProd) {
    h.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }

  return response;
}
