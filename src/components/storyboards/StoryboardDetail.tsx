import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import {
  ArrowLeft,
  Pencil,
  Eye,
  History,
  Share2,
  Maximize2,
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Storyboard, StoryboardWidget } from "../../types/storyboard";

interface StoryboardDetailProps {
  storyboard: Storyboard;
  onBack: () => void;
}

const iconButtonClass =
  "h-7 w-7 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-100 transition";

const WidgetCard: React.FC<{ widget: StoryboardWidget }> = ({ widget }) => {
  const spanClass = widget.span === "full" ? "sm:col-span-2" : "";

  return (
    <div className={`rounded-xl border border-slate-200 bg-white shadow-sm p-4 ${spanClass}`}>
      <p className="text-[12px] font-semibold text-slate-500 mb-3">{widget.title}</p>

      {widget.type === "kpi" && (
        <div>
          <p className="text-[26px] font-bold text-slate-800 leading-none">{widget.kpiValue}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={`flex items-center gap-0.5 text-[11.5px] font-semibold ${
                widget.kpiTrend === "down" ? "text-red-500" : "text-emerald-600"
              }`}
            >
              {widget.kpiTrend === "down" ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
              {widget.kpiChange}
            </span>
            <span className="text-[11.5px] text-slate-400">{widget.kpiLabel}</span>
          </div>
        </div>
      )}

      {widget.type === "chart" && (
        <ReactECharts option={widget.chartOption} opts={{ renderer: "svg" }} style={{ height: "220px", width: "100%" }} />
      )}

      {widget.type === "table" && (
        <table className="w-full text-[12.5px]">
          <thead>
            <tr>
              {widget.tableColumns?.map((col) => (
                <th key={col} className="text-left text-slate-400 font-semibold pb-2 border-b border-slate-100">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {widget.tableRows?.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="py-2 text-slate-700 border-b border-slate-50">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export const StoryboardDetail: React.FC<StoryboardDetailProps> = ({ storyboard, onBack }) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#fafbfc]">
      {/* Toolbar */}
      <div className="flex items-center justify-between pl-14 pr-6 py-3 border-b border-slate-200 bg-white flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBack}
            className="h-7 w-7 rounded-md flex items-center justify-center text-slate-500 hover:bg-slate-100 transition flex-shrink-0"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="min-w-0">
            <p className="text-[13.5px] font-semibold text-slate-800 truncate">{storyboard.title}</p>
            <p className="text-[11px] text-slate-400 truncate">{storyboard.lastUpdated}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setEditing((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11.5px] font-semibold transition ${
              editing ? "bg-neo-blue text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {editing ? <Pencil size={12} /> : <Eye size={12} />}
            {editing ? "Editing" : "Viewing"}
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1" />

          <button className={iconButtonClass}>
            <History size={13} />
          </button>
          <button className={iconButtonClass}>
            <Share2 size={13} />
          </button>
          <button className={iconButtonClass}>
            <Maximize2 size={13} />
          </button>
          <button className={iconButtonClass}>
            <SlidersHorizontal size={13} />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-6">
        <div className="max-w-4xl mx-auto space-y-5">
          {/* Header banner */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-[#e8eefc] flex items-center justify-center text-neo-blue font-bold text-sm flex-shrink-0">
              {storyboard.title.slice(0, 1)}
            </div>
            <div className="min-w-0">
              <p className="text-[17px] font-bold text-slate-800 truncate">{storyboard.title}</p>
              <p className="text-[12.5px] text-slate-500 truncate">{storyboard.subtitle}</p>
            </div>
          </div>

          {/* Widget grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {storyboard.widgets.map((widget) => (
              <WidgetCard key={widget.id} widget={widget} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
