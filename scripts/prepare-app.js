import fs from 'node:fs';
import path from 'node:path';

const sourceHtmlPath = path.resolve('public/assets/aistudio/OMEONE_4.0___________1__244cdabf.html');
const targetHtmlPath = path.resolve('index.html');

let sourceHtml = fs.readFileSync(sourceHtmlPath, 'utf-8');

// Ensure proper PWA & Apple tags in head
const pwaHeadTags = `
    <link rel="icon" type="image/svg+xml" href="/icon.svg" />
    <link rel="icon" type="image/png" sizes="192x192" href="/pwa-192x192.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <meta name="description" content="OMEONE 4.0 專業級手繪筆刷、圖層、動畫與本機專案管理工作室，專為 iOS 與 Android 手機與平板打造的 App 模式體驗。" />
    <meta property="og:title" content="OMEONE 4.0 繪圖工作室" />
    <meta property="og:description" content="OMEONE 4.0 專業級手繪筆刷、圖層、動畫與本機專案管理工作室，專為 iOS 與 Android 手機與平板打造的 App 模式體驗。" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/pwa-512x512.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="OMEONE" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="application-name" content="OMEONE" />
    <meta name="theme-color" content="#2f4bd8" />
`;

// Sync title
sourceHtml = sourceHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>OMEONE 4.0 繪圖工作室</title>`);

// Insert PWA head tags right after <head>
sourceHtml = sourceHtml.replace(/<head>/i, `<head>${pwaHeadTags}`);

// Ensure root container for React PWA overlay is at top of body
const pwaRootContainer = `<div id="pwa-root"></div>`;
sourceHtml = sourceHtml.replace(/<body>/i, `<body>\n${pwaRootContainer}`);

// Fix: Prevent "TypeError: Attempted to assign to readonly property" when window.fetch is readonly
const oldFetchBlock = `const nativeFetch=window.fetch.bind(window);window.fetch=function(input,init){const raw=typeof input==='string'?input:input?.url;if(!raw)return nativeFetch(input,init);const req=new URL(raw,location.href),configured=$('#enhDavUrl')?.value.trim();if(configured){try{const cfg=new URL(configured,location.href);if(req.href===cfg.href){const local=['localhost','127.0.0.1','[::1]'].includes(req.hostname);if((req.protocol!=='https:'&&!(local&&req.protocol==='http:'))||req.username||req.password)return Promise.reject(new TypeError('WebDAV 已封鎖：為保護帳密，僅允許 HTTPS。'))}}catch{}}return nativeFetch(input,init)};`;

const safeFetchBlock = `const nativeFetch=(typeof window!=='undefined'&&window.fetch)?window.fetch.bind(window):null;const safeFetch=function(input,init){const raw=typeof input==='string'?input:input?.url;if(!raw)return nativeFetch?nativeFetch(input,init):fetch(input,init);const req=new URL(raw,location.href),configured=$('#enhDavUrl')?.value.trim();if(configured){try{const cfg=new URL(configured,location.href);if(req.href===cfg.href){const local=['localhost','127.0.0.1','[::1]'].includes(req.hostname);if((req.protocol!=='https:'&&!(local&&req.protocol==='http:'))||req.username||req.password)return Promise.reject(new TypeError('WebDAV 已封鎖：為保護帳密，僅允許 HTTPS。'))}}catch{}}return nativeFetch?nativeFetch(input,init):fetch(input,init)};let fetch=safeFetch;try{window.fetch=safeFetch}catch(_e){};`;

sourceHtml = sourceHtml.replace(oldFetchBlock, safeFetchBlock);

// Ensure script module for main.tsx is right before </body>
const reactScriptTag = `<script type="module" src="/src/main.tsx"></script>`;
sourceHtml = sourceHtml.replace(/<\/body>/i, `${reactScriptTag}\n</body>`);

fs.writeFileSync(targetHtmlPath, sourceHtml, 'utf-8');
console.log('index.html prepared successfully with readonly fetch fix!');
