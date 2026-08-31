import type { Page } from '@playwright/test';

const AD_HOST_PATTERNS = [
  '**://*.googlesyndication.com/**',
  '**://*.doubleclick.net/**',
  '**://*.googleadservices.com/**',
  '**://*.pagead2.googlesyndication.com/**',
  '**://*.google-analytics.com/**',
  '**://*.googletagmanager.com/**',
  '**://*.gstatic.com/ads/**',
];

export async function blockAdRequests(page: Page): Promise<void> {
  await Promise.all(
    AD_HOST_PATTERNS.map((pattern) => page.route(pattern, (route) => route.abort()))
  );
}
