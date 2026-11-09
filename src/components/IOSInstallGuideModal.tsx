import { Share, PlusSquare, Sparkles, Smartphone, CheckCircle, X } from 'lucide-react';

interface IOSInstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IOSInstallGuideModal({ isOpen, onClose }: IOSInstallGuideModalProps) {
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
                安裝 OMEONE 到 iOS 主畫面
              </h3>
              <p className="text-xs text-zinc-400">iPhone / iPad 原生全螢幕 App 模式</p>
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

        {/* Steps */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="p-3 bg-blue-950/40 border border-blue-700/40 rounded-xl text-xs text-blue-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>加入主畫面後將隱藏 Safari 網址列與分頁欄，享有完整畫布空間，並保護本機圖層與筆刷不會被 Safari 自動清理！</span>
          </div>

          <div className="space-y-3.5">
            {/* Step 1 */}
            <div className="flex items-start gap-3.5 bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
              <div className="w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 font-bold text-sm flex items-center justify-center shrink-0 border border-blue-500/30">
                1
              </div>
              <div className="flex-1 text-sm">
                <div className="font-semibold text-zinc-100 flex items-center gap-1.5">
                  點擊 Safari 底部或頂部的「分享」按鈕
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  點擊螢幕下方（或 iPad 頂端網址列右側）的方框向上箭頭圖示：
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800/90 rounded-lg text-xs text-blue-300 font-mono border border-zinc-700">
                  <Share className="w-4 h-4 text-blue-400" />
                  <span>分享 (Share)</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3.5 bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
              <div className="w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 font-bold text-sm flex items-center justify-center shrink-0 border border-blue-500/30">
                2
              </div>
              <div className="flex-1 text-sm">
                <div className="font-semibold text-zinc-100 flex items-center gap-1.5">
                  在動作選單中選取「加入主畫面」
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  往下滑動選單列表，找到並點選帶有「＋」的圖示：
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800/90 rounded-lg text-xs text-emerald-300 font-medium border border-zinc-700">
                  <PlusSquare className="w-4 h-4 text-emerald-400" />
                  <span>加入主畫面 (Add to Home Screen)</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3.5 bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
              <div className="w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 font-bold text-sm flex items-center justify-center shrink-0 border border-blue-500/30">
                3
              </div>
              <div className="flex-1 text-sm">
                <div className="font-semibold text-zinc-100">
                  確認名稱並點擊右上角「新增」
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  名稱確認為「OMEONE」，完成後即可在 iPhone 或 iPad 桌面直接點擊圖示開啟原生繪圖視窗！
                </p>
              </div>
            </div>
          </div>

          {/* Features in App Mode */}
          <div className="pt-2 border-t border-zinc-800 text-xs text-zinc-400 space-y-1.5">
            <div className="flex items-center gap-2 text-zinc-300 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-blue-400" /> 支援 Apple Pencil 傾斜度、筆壓與防手掌誤觸
            </div>
            <div className="flex items-center gap-2 text-zinc-300 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-blue-400" /> 離線斷網亦可流暢作畫與管理 IndexedDB 本機專案
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-900/90 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40"
          >
            <Smartphone className="w-4 h-4" />
            我知道了，現在去設定
          </button>
        </div>
      </div>
    </div>
  );
}
