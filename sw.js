const CACHE_NAME = 'pomodoro-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Força o Service Worker a ativar imediatamente
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim()); // Assume o controle da página na hora
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
