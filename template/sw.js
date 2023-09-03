const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `${registration.scope}!${CACHE_VERSION}`;

const urlsToCache = [
    '.',
    'css/style.css',
    'js/main.js',
    'font/s2font.ttf',
    'remixicon/remixicon.css',
    'remixicon/remixicon.eot',
    'remixicon/remixicon.svg',
    'remixicon/remixicon.woff',
    'remixicon/remixicon.woff2',
    'remixicon/remixicon.ttf',
    'img/check1.webp',
    'img/check2.webp',
    'img/check3.webp',
    'img/check4.webp',
    'img/check5.webp',
    'img/star1.webp',
    'img/star2.webp',
    'img/star3.webp',
    'img/star4.webp',
    'img/star5.webp',
    'img/weapons/--.webp',
    'img/weapons/-1.webp',
    'img/weapons/-2.webp',
    'img/weapon/-999.webp',
    'img/weapon/0.webp',
    'img/weapon/1.webp',
    'img/weapon/10.webp',
    'img/weapon/11.webp',
    'img/weapon/20.webp',
    'img/weapon/21.webp',
    'img/weapon/30.webp',
    'img/weapon/31.webp',
    'img/weapon/40.webp',
    'img/weapon/41.webp',
    'img/weapon/45.webp',
    'img/weapon/50.webp',
    'img/weapon/60.webp',
    'img/weapon/61.webp',
    'img/weapon/70.webp',
    'img/weapon/71.webp',
    'img/weapon/80.webp',
    'img/weapon/81.webp',
    'img/weapon/90.webp',
    'img/weapon/91.webp',
    'img/weapon/100.webp',
    'img/weapon/101.webp',
    'img/weapon/200.webp',
    'img/weapon/201.webp',
    'img/weapon/210.webp',
    'img/weapon/220.webp',
    'img/weapon/230.webp',
    'img/weapon/231.webp',
    'img/weapon/240.webp',
    'img/weapon/241.webp',
    'img/weapon/250.webp',
    'img/weapon/251.webp',
    'img/weapon/260.webp',
    'img/weapon/300.webp',
    'img/weapon/301.webp',
    'img/weapon/310.webp',
    'img/weapon/311.webp',
    'img/weapon/400.webp',
    'img/weapon/1000.webp',
    'img/weapon/1001.webp',
    'img/weapon/1010.webp',
    'img/weapon/1011.webp',
    'img/weapon/1020.webp',
    'img/weapon/1021.webp',
    'img/weapon/1030.webp',
    'img/weapon/1040.webp',
    'img/weapon/1041.webp',
    'img/weapon/1100.webp',
    'img/weapon/1101.webp',
    'img/weapon/1110.webp',
    'img/weapon/1111.webp',
    'img/weapon/1120.webp',
    'img/weapon/2000.webp',
    'img/weapon/2010.webp',
    'img/weapon/2011.webp',
    'img/weapon/2020.webp',
    'img/weapon/2021.webp',
    'img/weapon/2030.webp',
    'img/weapon/2040.webp',
    'img/weapon/2050.webp',
    'img/weapon/2060.webp',
    'img/weapon/2061.webp',
    'img/weapon/2070.webp',
    'img/weapon/3000.webp',
    'img/weapon/3001.webp',
    'img/weapon/3010.webp',
    'img/weapon/3011.webp',
    'img/weapon/3020.webp',
    'img/weapon/3021.webp',
    'img/weapon/3030.webp',
    'img/weapon/3031.webp',
    'img/weapon/3040.webp',
    'img/weapon/3050.webp',
    'img/weapon/4000.webp',
    'img/weapon/4001.webp',
    'img/weapon/4010.webp',
    'img/weapon/4011.webp',
    'img/weapon/4020.webp',
    'img/weapon/4030.webp',
    'img/weapon/4031.webp',
    'img/weapon/4040.webp',
    'img/weapon/4050.webp',
    'img/weapon/5000.webp',
    'img/weapon/5001.webp',
    'img/weapon/5010.webp',
    'img/weapon/5020.webp',
    'img/weapon/5030.webp',
    'img/weapon/5031.webp',
    'img/weapon/5040.webp',
    'img/weapon/5041.webp',
    'img/weapon/6000.webp',
    'img/weapon/6001.webp',
    'img/weapon/6010.webp',
    'img/weapon/6011.webp',
    'img/weapon/6020.webp',
    'img/weapon/7010.webp',
    'img/weapon/7011.webp',
    'img/weapon/7020.webp',
    'img/weapon/8000.webp',
    'img/weapon/8010.webp',
    'img/weapon/8011.webp',
    'img/weapon/20900.webp',
    'img/weapon/22900.webp',
    'img/weapon/23900.webp',
    'img/weapon/25900.webp',
    'img/weapon/26900.webp',
    'img/weapon/27900.webp',
    'img/weapon/28900.webp',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
        return cacheNames.filter((cacheName) => {
            // このスコープに所属していて且つCACHE_NAMEではないキャッシュを探す
            return cacheName.startsWith(`${registration.scope}!`) && cacheName !== CACHE_NAME;
        });
        }).then((cachesToDelete) => {
            return Promise.all(cachesToDelete.map((cacheName) => {
                // いらないキャッシュを削除する
                return caches.delete(cacheName);
            }));
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            let fetchRequest = event.request.clone();
            
            return fetch(fetchRequest).then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                let responseToCache = response.clone();
                
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                
                return response;
            });
        })
    );
});
