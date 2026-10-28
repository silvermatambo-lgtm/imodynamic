const CACHE='imodynamic-ultramax7-20261028-v3';
const SHELL=['/','/index.html','/style.css?v=20261028','/app.js?v=20261028','/brand/logo.svg','/offline.html'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('imodynamic-')&&key!==CACHE).map(key=>caches.delete(key)))));self.clients.claim()});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin)return;
 if(req.mode==='navigate'){event.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put('/',copy))}return res}).catch(async()=>await caches.match('/')||await caches.match('/offline.html')));return}
 if(url.pathname.startsWith('/brand/')||['/style.css','/app.js','/manifest.webmanifest'].includes(url.pathname)){event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(response=>{if(response.ok){const clone=response.clone();caches.open(CACHE).then(cache=>cache.put(req,clone))}return response})));return}
});
