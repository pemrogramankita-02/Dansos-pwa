const APP_URL = "https://script.google.com/macros/s/AKfycby3BAMptxodqP9TcnfsRwSUtyKyMrXVisnOzbIORuFOMjviKd2v1eXWqh2vSvYcC2_N/exec";
const CACHE = 'dansos-pwa-v1';
const APP_SHELL = ['./', './manifest.json', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-1024.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin === self.location.origin) {
    event.respondWith(caches.match(event.request).then(r => r || fetch(event.request)));
  }
});
