const CACHE_NAME = 'pomodoro-cache-v2';

// Lista de arquivos com caminhos relativos corretos para o Netlify
const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'palhetadecores.png',
  'foco-pomodorologo.png'
];

// 1. Evento de Instalação (Roda apenas uma vez, salvando os arquivos no cache)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Salvando arquivos no cache...');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting()) // Força o Service Worker a ativar imediatamente
  );
});

// 2. Evento de Ativação (Assume o controle do site na hora)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Apagando cache antigo...');
            return caches.delete(cache);
          }
        })
      );
    }).then(() => clients.claim())
  );
});

// 3. Evento Fetch (Serve os arquivos do cache ou busca na rede se não encontrar)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Retorna o arquivo do cache se existir, senão busca na rede
      return cachedResponse || fetch(event.request);
    })
  );
});
