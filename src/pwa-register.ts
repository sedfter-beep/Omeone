import { registerSW } from 'virtual:pwa-register';

export function setupServiceWorker(onOfflineReady?: () => void) {
  if ('serviceWorker' in navigator) {
    const updateSW = registerSW({
      immediate: true,
      onOfflineReady() {
        console.log('[OMEONE PWA] 應用程式已完成離線快取，隨時可在無網路環境下繪圖使用。');
        onOfflineReady?.();
      },
      onNeedRefresh() {
        console.log('[OMEONE PWA] 發現新版本，已自動同步。');
        updateSW(true);
      },
      onRegisterError(error) {
        console.warn('[OMEONE PWA] Service worker 註冊通知:', error);
      }
    });
  }
}
