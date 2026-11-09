import { Download, CheckCircle, MoreVertical, Sparkles, Smartphone, X } from 'lucide-react';

interface AndroidInstallModalProps {
  isOpen: boolean;
  canInstallDirectly: boolean;
  onInstall: () => Promise<boolean>;
  onClose: () => void;
}

export function AndroidInstallModal({ isOpen, canInstallDirectly, onInstall, onClose }: AndroidInstallModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 animate-in fade-in duration-200">
      <div 
        className="bg-[#1b1d23] text-zinc-100 border border-zinc-700/80 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-500 p-0.5 shadow-md flex items-center justify-center">
              <img src="/pwa-192x192.png" alt="OMEONE App" className="w-9 h-9 rounded-[10px]" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                安裝 OMEONE 到 Android 主畫面
              </h3>
              <p className="text-xs text-zinc-400">Android 手機與平板 PWA 原生應用模式</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="p-3 bg-blue-950/40 border border-blue-700/40 rounded-xl text-xs text-blue-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>安裝為獨立 App 後，可全螢幕繪圖、離線存取本機專案，且支援手寫筆壓感與懸浮預測！</span>
          </div>

          {canInstallDirectly ? (
            <div className="text-center py-3 space-y-3">
              <p className="text-sm text-zinc-300">
                點擊下方按鈕，系統將自動彈出 Android 原生安裝確認視窗：
              </p>
              <button
                onClick={async () => {
                  const success = await onInstall();
                  if (success) onClose();
                }}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:from-blue-700 active:to-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 transition"
              >
                <Download className="w-5 h-5" />
                立即一鍵安裝 OMEONE App
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
                <div className="w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 font-bold text-sm flex items-center justify-center shrink-0 border border-blue-500/30">
                  1
                </div>
                <div className="flex-1 text-sm">
                  <div className="font-semibold text-zinc-100 flex items-center gap-1.5">
                    點擊瀏覽器右上角的選單圖示
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    點擊 Chrome 或瀏覽器右上角的三個直點：
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-800 rounded-lg text-xs text-zinc-300 font-mono border border-zinc-700">
                    <MoreVertical className="w-4 h-4 text-zinc-400" />
                    <span>選單 (Menu)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
                <div className="w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 font-bold text-sm flex items-center justify-center shrink-0 border border-blue-500/30">
                  2
                </div>
                <div className="flex-1 text-sm">
                  <div className="font-semibold text-zinc-100 flex items-center gap-1.5">
                    選取「安裝應用程式」或「加到主畫面」
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    系統會將 OMEONE 圖示新增至桌面與應用程式抽屜，即可無邊框全螢幕使用。
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-zinc-800 text-xs text-zinc-400 space-y-1.5">
            <div className="flex items-center gap-2 text-zinc-300 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-blue-400" /> 支援 Samsung S Pen 及 Android 各款主動式觸控筆
            </div>
            <div className="flex items-center gap-2 text-zinc-300 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-blue-400" /> 離線就緒，完全不耗費行動數據流量
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-900/90 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2"
          >
            <Smartphone className="w-4 h-4" />
            關閉視窗
          </button>
        </div>
      </div>
    </div>
  );
}
