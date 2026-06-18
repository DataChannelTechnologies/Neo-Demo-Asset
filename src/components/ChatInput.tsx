import React from "react";
import { Sliders, Sparkles, ArrowUp } from "lucide-react";

export const ChatInput: React.FC = () => {
  return (
    <div className="bg-white px-6 py-6 flex-shrink-0">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl border border-slate-300 bg-[#fafbfc] p-3.5 shadow-sm flex flex-col gap-2">
          {/* Textarea */}
          <textarea
            disabled
            placeholder="Ask anything about your data..."
            className="w-full h-14 resize-none bg-transparent px-2 py-1 outline-none text-[13.5px] text-slate-800 placeholder-slate-400 cursor-not-allowed"
          />

          {/* Bottom row actions */}
          <div className="flex items-center justify-between px-1">
            {/* Left: Actions */}
            <div className="flex items-center gap-2">
              <button className="h-8 w-8 rounded-lg border border-slate-300 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-100 transition cursor-default">
                <Sliders size={14} className="text-slate-500" />
              </button>
              <button className="h-8 px-3 rounded-lg border border-slate-300 bg-white flex items-center gap-1.5 text-slate-650 text-slate-650 hover:bg-slate-100 transition cursor-default">
                <Sparkles size={13} className="text-slate-500" />
                <span className="text-[11px] font-semibold">Explanatory</span>
              </button>
            </div>

            {/* Right: Send */}
            <button className="h-8 w-8 rounded-lg bg-neo-blue hover:bg-neo-blue-hover text-white flex items-center justify-center shadow-sm transition cursor-default">
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
