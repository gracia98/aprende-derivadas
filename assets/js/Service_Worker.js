;
//asignar un nombre y versión al cache
const CACHE_NAME = 'WebDeveloper',
  urlsToCache = [
    './',
    '../../index.html',
    '../vendor/animate.css/animate.min.css',
    '../vendor/aos/aos.css',
    '../vendor/bootstrap/css/bootstrap.min.css',
    '../vendor/bootstrap-icons/bootstrap-icons.css',
    '../vendor/boxicons/css/boxicons.min.css',
    '../vendor/remixicon/remixicon.css',
    '../vendor/swiper/swiper-bundle.min.css',
    '../css/style.css',
    '../css/test.css',

    '../vendor/purecounter/purecounter_vanilla.js',
    '../vendor/aos/aos.js',
    '../vendor/bootstrap/js/bootstrap.bundle.min.js',
    '../vendor/swiper/swiper-bundle.min.js',
    '../vendor/php-email-form/validate.js',
    '../js/main.js',
    '../js/test-1.js',
    '../js/test-2.js',
    '../js/test-3.js',
    '../js/test-4.js',

    './regist_serviceWorker.js',
    '../img/icons/icon-512x512.png',
    '../img/icons/icon-72x72.png'
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})