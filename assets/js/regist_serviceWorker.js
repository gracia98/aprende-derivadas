if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./Service_Worker.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el SW', err));
}

/* 

Otra forma de registrar el SW

if('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker
    .register('./Service_Worker.js')
    .then(res => console.log('SW registrado'))
    .catch(err => console.log('SW no registrado', err))

  });
}

*/