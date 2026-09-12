import React from "react";

interface StoryboardMockupProps {
  variant: "A" | "B" | "C";
}

const statTiles = [
  { value: "$12.4K", delta: "+6.2%" },
  { value: "840K", delta: "+15.3%" },
  { value: "4,210", delta: "+9.8%" },
  { value: "3.4x", delta: "+2.1%" },
];

const bars = [
  { label: "Google Search", width: "75%", color: "bg-blue-500" },
  { label: "Facebook Ads", width: "55%", color: "bg-sky-400" },
  { label: "LinkedIn Ads", width: "40%", color: "bg-cyan-400" },
];

const statRows = [
  { label: "Total Revenue", value: "$1.24M", delta: "+13.8%", up: true },
  { label: "Active Customers", value: "8,432", delta: "+9.2%", up: true },
  { label: "Avg Order Value", value: "$142", delta: "-2.1%", up: false },
];

const trendBars = [
  { height: 35, color: "bg-blue-400" },
  { height: 55, color: "bg-sky-400" },
  { height: 40, color: "bg-cyan-400" },
  { height: 72, color: "bg-emerald-400" },
  { height: 50, color: "bg-orange-400" },
  { height: 85, color: "bg-blue-500" },
  { height: 60, color: "bg-sky-500" },
];

const MockupHeader: React.FC<{ color: string }> = ({ color }) => (
  <div className="h-[16px] flex items-center gap-1 flex-shrink-0">
    <div className={`h-2.5 w-2.5 rounded-sm ${color} flex-shrink-0`} />
    <div className="h-[5px] w-2/3 rounded-full bg-slate-300" />
  </div>
);

export const StoryboardMockup: React.FC<StoryboardMockupProps> = ({ variant }) => {
  if (variant === "A") {
    return (
      <div className="w-full h-full p-2">
        <div className="w-full h-full rounded-md bg-white border border-slate-100 shadow-sm p-2 flex flex-col gap-1.5 overflow-hidden">
          <MockupHeader color="bg-orange-400" />
          <div className="h-[4px] w-2/5 rounded-full bg-slate-200 ml-3.5 flex-shrink-0" />

          <div className="h-[76px] flex flex-col gap-1.5">
            <div className="grid grid-cols-4 gap-1">
              {statTiles.map((s) => (
                <div key={s.value} className="h-[24px] rounded-sm bg-slate-50 px-1 py-1">
                  <p className="text-[6px] font-bold text-slate-700 leading-none">{s.value}</p>
                  <p className="text-[5px] font-semibold text-emerald-500 mt-0.5 leading-none">{s.delta}</p>
                </div>
              ))}
            </div>

            <div className="flex-1 flex flex-col justify-center gap-1.5">
              {bars.map((b) => (
                <div key={b.label} className="flex items-center gap-1">
                  <div className="h-[4px] flex-1 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full rounded-full ${b.color}`} style={{ width: b.width }} />
                  </div>
                  <span className="text-[5px] text-slate-400 w-6 text-right leading-none">{b.width}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "B") {
    return (
      <div className="w-full h-full p-2">
        <div className="w-full h-full rounded-md bg-white border border-slate-100 shadow-sm p-2 flex flex-col gap-1.5 overflow-hidden">
          <MockupHeader color="bg-emerald-400" />
          <div className="h-[4px] w-2/5 rounded-full bg-slate-200 ml-3.5 flex-shrink-0" />

          <div className="h-[76px] flex flex-col gap-1">
            {statRows.map((row) => (
              <div
                key={row.label}
                className="h-[24px] flex items-center justify-between rounded-sm bg-slate-50 px-1.5"
              >
                <div>
                  <p className="text-[5px] font-semibold text-slate-500 leading-none">{row.label}</p>
                  <p className="text-[6.5px] font-bold text-slate-800 mt-0.5 leading-none">{row.value}</p>
                </div>
                <span
                  className={`text-[5px] font-bold leading-none ${
                    row.up ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {row.delta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-2">
      <div className="w-full h-full rounded-md bg-white border border-slate-100 shadow-sm p-2 flex flex-col gap-1.5 overflow-hidden">
        <MockupHeader color="bg-sky-400" />
        <div className="h-[4px] w-2/5 rounded-full bg-slate-200 ml-3.5 flex-shrink-0" />

        <div className="h-[76px] flex items-end gap-1.5 px-0.5">
          {trendBars.map((b, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-sm ${b.color}`}
              style={{ height: `${b.height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
