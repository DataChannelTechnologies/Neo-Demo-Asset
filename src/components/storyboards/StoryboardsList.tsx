import React from "react";
import { Search, Plus, History, Share2 } from "lucide-react";
import { Storyboard } from "../../types/storyboard";
import { StoryboardMockup } from "./StoryboardMockup";

interface StoryboardsListProps {
  storyboards: Storyboard[];
  onOpen: (id: string) => void;
}

export const StoryboardsList: React.FC<StoryboardsListProps> = ({ storyboards, onOpen }) => {
  return (
    <div className="flex-1 overflow-y-auto px-8 pt-16 pb-8 custom-scrollbar bg-white">
      <div className="max-w-[1200px] mx-auto w-full space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-[23px] font-bold text-slate-800 leading-tight">Storyboards</h1>
          <h2 className="text-[14.5px] text-slate-500 mt-2">
            Pin insights from your conversations into shareable, presentation-ready dashboards
          </h2>
        </div>

        {/* Top bar: search + create */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              disabled
              placeholder="Search storyboards..."
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 bg-white text-[12.5px] text-slate-700 placeholder-slate-400 outline-none cursor-not-allowed"
            />
          </div>

          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-neo-blue hover:bg-neo-blue-hover text-white text-[12.5px] font-semibold shadow-sm transition cursor-default">
            <Plus size={15} />
            New storyboard
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {storyboards.map((sb) => (
            <button
              key={sb.id}
              onClick={() => onOpen(sb.id)}
              className="group text-left h-[210px] rounded-xl border border-slate-200 bg-white shadow-sm hover:border-neo-blue hover:shadow-md transition overflow-hidden flex flex-col"
            >
              <div className="h-[125px] bg-slate-50 border-b border-slate-100">
                <StoryboardMockup variant={sb.mockup} />
              </div>

              <div className="h-[85px] px-4 py-3 flex flex-col justify-between flex-shrink-0">
                <div className="h-[34px]">
                  <p className="text-[13.5px] font-semibold text-slate-800 truncate">{sb.title}</p>
                  <p className="text-[11.5px] text-slate-400 mt-0.5 truncate">{sb.lastUpdated}</p>
                </div>

                <div className="h-7 flex items-center justify-end gap-1.5">
                  <span
                    role="button"
                    tabIndex={-1}
                    className="h-7 w-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
                  >
                    <History size={13} />
                  </span>
                  <span
                    role="button"
                    tabIndex={-1}
                    className="h-7 w-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
                  >
                    <Share2 size={13} />
                  </span>
                </div>
              </div>
            </button>
          ))}

          {/* Dashed "create new" card */}
          <div className="h-[210px] rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-slate-400 cursor-default">
            <div className="h-9 w-9 rounded-full border-2 border-current flex items-center justify-center">
              <Plus size={18} />
            </div>
            <span className="text-[12.5px] font-semibold">New storyboard</span>
          </div>
        </div>
      </div>
    </div>
  );
};
