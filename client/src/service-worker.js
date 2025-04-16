import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

/* eslint-disable no-restricted-globals */

cleanupOutdatedCaches();

// Precache assets (self.__WB_MANIFEST is injected at build time)
precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
  ({ request }) => request.mode === 'navigate',
  async ({ event }) => {
    return caches.match('index.html', { ignoreSearch: true });
  }
);

// Cache API requests to /api/places
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/places'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache'
  })
);