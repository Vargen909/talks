import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

import { routing } from "./i18n/routing";
import { applySecurityHeaders } from "./lib/security/security-headers";

const handleI18n = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const response = handleI18n(request);
  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    // Undvik att i18n-middlewaren tar `public/brand/*` (loggor) — annars redirectas `/brand/...` → `/sv/brand/...` och bilderna blir trasiga.
    "/((?!api|_next|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|brand|icon).*)",
  ],
};
