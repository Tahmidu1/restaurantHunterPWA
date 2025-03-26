import {precacheAndRoute} from 'workbox-precaching';
/* eslint-disable no-restricted-globals */
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// self.__WB_MANIFEST is injected at build time to include your static assets
precacheAndRoute(self.__WB_MANIFEST || []);
registerRoute(
    ({ url }) => url.href.includes('/api/places'),
    new StaleWhileRevalidate({ cacheName: 'api-cache' })
  );