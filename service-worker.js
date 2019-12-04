/* eslint-env browser */
/* eslint-disable no-restricted-globals */

const staticAssets = [
  './',
  'https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css',
  'https://unpkg.com/axios/dist/axios.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js',
  './api.js',
  './main.js',
];

self.addEventListener('install', async () => {
  const cache = await caches.open('static-meme');
  cache.addAll(staticAssets);
});

async function cacheData(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || fetch(request);
}

async function networkFirst(request) {
  const cache = await caches.open('dynamic-meme');

  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    return cache.match(request);
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(cacheData(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});
