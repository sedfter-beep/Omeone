import { useState, useEffect, useCallback } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWA() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isAndroid, setIsAndroid] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isWakeLocked, setIsWakeLocked] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [wakeLockSentinel, setWakeLockSentinel] = useState<any>(null);

  useEffect(() => {
    // Detect OS
    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const android = /Android/.test(ua);
    setIsIOS(ios);
    setIsAndroid(android);

    // Detect Standalone mode
    const checkStandalone = () => {
      const standalone = 
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://');
      setIsStandalone(standalone);
      if (standalone) setIsInstalled(true);
    };

    checkStandalone();
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener('change', checkStandalone);

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    // Listen for appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    // Online / Offline
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Fullscreen change
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      mediaQuery.removeEventListener('change', checkStandalone);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Trigger Android native install prompt
  const promptInstall = useCallback(async () => {
    if (!installPrompt) return false;
    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setInstallPrompt(null);
        return true;
      }
    } catch (err) {
      console.warn('Install prompt failed:', err);
    }
    return false;
  }, [installPrompt]);

  // Toggle Screen Wake Lock (keeps display active while drawing)
  const toggleWakeLock = useCallback(async () => {
    if ('wakeLock' in navigator) {
      try {
        if (wakeLockSentinel) {
          await wakeLockSentinel.release();
          setWakeLockSentinel(null);
          setIsWakeLocked(false);
          return false;
        } else {
          const sentinel = await (navigator as any).wakeLock.request('screen');
          setWakeLockSentinel(sentinel);
          setIsWakeLocked(true);
          sentinel.addEventListener('release', () => {
            setIsWakeLocked(false);
            setWakeLockSentinel(null);
          });
          return true;
        }
      } catch (err) {
        console.warn('Wake Lock error:', err);
      }
    }
    return false;
  }, [wakeLockSentinel]);

  // Toggle Fullscreen
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if ((document.documentElement as any).webkitRequestFullscreen) {
          await (document.documentElement as any).webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen toggle error:', err);
    }
  }, []);

  // Trigger brief haptic buzz
  const triggerHaptic = useCallback((duration = 15) => {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(duration);
      } catch {}
    }
  }, []);

  return {
    installPrompt,
    isInstalled,
    isStandalone,
    isIOS,
    isAndroid,
    isOnline,
    isWakeLocked,
    isFullscreen,
    canInstallAndroid: !!installPrompt,
    promptInstall,
    toggleWakeLock,
    toggleFullscreen,
    triggerHaptic
  };
}
