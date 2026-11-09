import { useEffect } from 'react';
import { setupServiceWorker } from './pwa-register';
import { AppModeBanner } from './components/AppModeBanner';

export default function App() {
  useEffect(() => {
    // Register PWA service worker
    setupServiceWorker(() => {
      console.log('OMEONE 4.0 PWA Cache Ready');
    });

    // Touch event optimization for iOS & Android
    // Prevent default pinch-zoom on document body while allowing canvas touch handlers to control scaling
    const preventOverscroll = (e: TouchEvent) => {
      if (e.touches.length > 1 && !(e.target as HTMLElement)?.closest('#view, #stage, canvas')) {
        // Prevent multi-touch browser zoom outside the drawing canvas
        // e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventOverscroll, { passive: false });

    return () => {
      document.removeEventListener('touchmove', preventOverscroll);
    };
  }, []);

  return <AppModeBanner />;
}
