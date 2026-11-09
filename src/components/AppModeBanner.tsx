import { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  Maximize2, 
  Minimize2, 
  Lightbulb, 
  Wifi, 
  WifiOff, 
  HelpCircle, 
  ChevronUp, 
  ChevronDown,
  Sparkles,
  Check
} from 'lucide-react';
import { usePWA } from '../usePWA';
import { IOSInstallGuideModal } from './IOSInstallGuideModal';
import { AndroidInstallModal } from './AndroidInstallModal';
import { TouchTipsModal } from './TouchTipsModal';

export function AppModeBanner() {
  const {
    isStandalone,
    isInstalled,
    isIOS,
    isAndroid,
    isOnline,
    isWakeLocked,
    isFullscreen,
    canInstallAndroid,
    promptInstall,
    toggleWakeLock,
    toggleFullscreen,
    triggerHaptic
  } = usePWA();

  const [isIOSModalOpen, setIsIOSModalOpen] = useState(false);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);
  const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleInstallClick = () => {
    triggerHaptic(20);
    if (isIOS) {
      setIsIOSModalOpen(true);
    } else if (canInstallAndroid) {
      promptInstall();
    } else {
      setIsAndroidModalOpen(true);
    }
  };

  return (
    <>
      {/* Top Mobile Safe-Area App Header */}
      <header className="w-full bg-[#14161c] text-zinc-100 border-b border-zinc-800/80 select-none shadow-sm transition-all duration-200">
        <div className="max-w-7xl mx-auto px-3 py-1.5 flex items-center justify-between gap-2 text-xs">
          {/* Left: Brand & App Mode Badge */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-1.5 shrink-0">
              <img 
                src="/pwa-192x192.png" 
                alt="OMEONE Logo" 
                className="w-5 h-5 rounded-md shadow-sm"
              />
              <span className="font-bold tracking-wide text-zinc-100 hidden sm:inline">
                OMEONE 4.0
              </span>
            </div>

            {/* Standalone or Browser Status Pill */}
            {isStandalone ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-400 border border-emerald-800/50 text-[11px] font-medium shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{isIOS ? 'iOS App 模式' : isAndroid ? 'Android App 模式' : '原生 App 模式'}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-950/70 text-blue-300 border border-blue-800/40 text-[11px] font-medium shrink-0">
                <Smartphone className="w-3 h-3 text-blue-400" />
                <span className="hidden xs:inline">瀏覽器分頁</span>
              </span>
            )}

            {/* Offline Status */}
            <span 
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ${
                isOnline ? 'text-zinc-400' : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
              }`}
              title={isOnline ? '網路連線正常，作品已快取' : '處於離線狀態，本機繪圖完全不受影響'}
            >
              {isOnline ? <Wifi className="w-3 h-3 text-emerald-500" /> : <WifiOff className="w-3 h-3 text-amber-400" />}
              <span className="hidden md:inline">{isOnline ? '離線就緒' : '離線繪圖中'}</span>
            </span>
          </div>

          {/* Right: Actions and Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Install Prompt Button (Shown when not in standalone mode) */}
            {!isStandalone && !isInstalled && (
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-lg shadow-sm shadow-blue-900/30 transition text-[11px] border border-blue-400/30 active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isIOS ? '加到主畫面' : '安裝 App 模式'}</span>
              </button>
            )}

            {/* Screen Wake Lock Toggle */}
            <button
              onClick={() => {
                triggerHaptic(15);
                toggleWakeLock();
              }}
              title={isWakeLocked ? '防休眠已開啟（螢幕保持常亮）' : '開啟防休眠（繪圖中螢幕不變暗）'}
              className={`p-1.5 rounded-lg border text-[11px] transition flex items-center gap-1 ${
                isWakeLocked 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20' 
                  : 'bg-zinc-800/70 text-zinc-400 border-zinc-700/60 hover:text-zinc-200'
              }`}
            >
              <Lightbulb className={`w-3.5 h-3.5 ${isWakeLocked ? 'text-amber-400 fill-amber-400' : ''}`} />
              <span className="hidden lg:inline">{isWakeLocked ? '常亮開' : '防休眠'}</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => {
                triggerHaptic(15);
                toggleFullscreen();
              }}
              title={isFullscreen ? '結束全螢幕' : '進入全螢幕畫布'}
              className={`p-1.5 rounded-lg border text-[11px] transition flex items-center gap-1 ${
                isFullscreen
                  ? 'bg-blue-600/20 text-blue-300 border-blue-500/50'
                  : 'bg-zinc-800/70 text-zinc-400 border-zinc-700/60 hover:text-zinc-200'
              }`}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline">{isFullscreen ? '還原' : '全螢幕'}</span>
            </button>

            {/* Touch & Apple Pencil Gestures Help */}
            <button
              onClick={() => {
                triggerHaptic(15);
                setIsTipsModalOpen(true);
              }}
              title="行動裝置手勢與觸控筆說明"
              className="p-1.5 rounded-lg bg-zinc-800/70 text-zinc-400 border border-zinc-700/60 hover:text-zinc-200 text-[11px] flex items-center gap-1 transition"
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">手勢</span>
            </button>
          </div>
        </div>

        {/* Collapsible promotional tip when running in browser */}
        {!isStandalone && !isInstalled && !isCollapsed && (
          <div className="bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-zinc-900 border-t border-zinc-800/60 px-3 py-1 flex items-center justify-between gap-2 text-[11px] text-zinc-300">
            <div className="flex items-center gap-1.5 truncate">
              <Sparkles className="w-3 h-3 text-blue-400 shrink-0" />
              <span className="truncate">
                {isIOS 
                  ? '在 iOS Safari 點擊「分享 ➔ 加入主畫面」，即享全螢幕與 Apple Pencil 防誤觸！'
                  : '點擊安裝將 OMEONE 存至手機桌面，免開瀏覽器即可隨時創作。'}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleInstallClick}
                className="text-blue-400 hover:text-blue-300 underline font-medium"
              >
                查看教學
              </button>
              <button
                onClick={() => setIsCollapsed(true)}
                className="text-zinc-500 hover:text-zinc-300 p-0.5"
                title="收合提示"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      <IOSInstallGuideModal 
        isOpen={isIOSModalOpen} 
        onClose={() => setIsIOSModalOpen(false)} 
      />
      <AndroidInstallModal 
        isOpen={isAndroidModalOpen} 
        canInstallDirectly={canInstallAndroid}
        onInstall={promptInstall}
        onClose={() => setIsAndroidModalOpen(false)} 
      />
      <TouchTipsModal 
        isOpen={isTipsModalOpen} 
        onClose={() => setIsTipsModalOpen(false)} 
      />
    </>
  );
}
