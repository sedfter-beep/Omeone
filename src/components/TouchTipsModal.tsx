import { Hand, Eye, PenTool, Pin, ShieldCheck, Zap, X } from 'lucide-react';

interface TouchTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TouchTipsModal({ isOpen, onClose }: TouchTipsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 animate-in fade-in duration-200">
      <div 
        className="bg-[#1b1d23] text-zinc-100 border border-zinc-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Hand className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                行動裝置與觸控筆手勢指南
              </h3>
              <p className="text-xs text-zinc-400">iOS / Android 手機與平板專用繪圖技巧</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3.5 max-h-[70vh] overflow-y-auto text-sm">
          {/* Tip 1 */}
          <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800/80 flex items-start gap-3">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg shrink-0 mt-0.5">
              <Hand className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-zinc-100">兩指縮放與自由移動畫布</div>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                在畫布區域任意處用兩根手指張合即可縮放尺寸，雙指拖曳可平移視角，點擊工具列「置中」可立即還原視角。
              </p>
            </div>
          </div>

          {/* Tip 2 */}
          <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800/80 flex items-start gap-3">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg shrink-0 mt-0.5">
              <PenTool className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-zinc-100">Apple Pencil & 觸控筆防誤觸</div>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                當使用 Apple Pencil 或主動式觸控筆時，系統自動啟用筆尖壓力感應與筆刷軌跡預測，手掌靠在螢幕上作畫將被智慧忽略。
              </p>
            </div>
          </div>

          {/* Tip 3 */}
          <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800/80 flex items-start gap-3">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg shrink-0 mt-0.5">
              <Pin className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-zinc-100">📌 釘選常用筆刷尺寸</div>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                在下方筆刷調色列點擊 📌 圖示，可將當前的粗細與筆刷設定釘選在頂部快捷列，方便隨時一鍵切換。
              </p>
            </div>
          </div>

          {/* Tip 4 */}
          <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800/80 flex items-start gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0 mt-0.5">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-zinc-100">💡 螢幕防休眠常亮鎖定</div>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                在頂部 App 控制列點擊「防休眠」，可保持螢幕常亮，作畫過程中不會因為短暫思考而導致手機或平板螢幕自動暗屏。
              </p>
            </div>
          </div>

          {/* Tip 5 */}
          <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800/80 flex items-start gap-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-zinc-100">本機專案與安全儲存</div>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                作品即時自動存於瀏覽器本機 IndexedDB 資料庫中。在 App 模式或已加入主畫面狀態下，較不容易受瀏覽器暫存清理影響。
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-900/90 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition"
          >
            關閉指南
          </button>
        </div>
      </div>
    </div>
  );
}
