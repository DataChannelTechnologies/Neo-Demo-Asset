import React from "react";
import { MessageSquare, FolderKanban, Database, Plus, Settings } from "lucide-react";
import NeoLogo from "../assets/neo-logo.svg";

interface SidebarProps {
  sidebarOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  return (
    <aside
      className={`transition-all duration-300 ease-in-out bg-[#fafbfc] flex flex-col z-20 flex-shrink-0 hidden md:flex ${
        sidebarOpen ? "md:w-[250px]" : "md:w-0 md:overflow-hidden"
      }`}
    >
      {/* Sidebar Header: Logo (No border-b for connected look) */}
      <div className="h-16 pl-[26px] pr-4 flex items-center justify-start gap-2.5 flex-shrink-0 bg-[#fafbfc]">
        <img src={NeoLogo} alt="Neo Logo" className="h-8 object-contain" />
        <div className="flex items-baseline select-none">
          <span className="text-[15px] font-bold text-slate-800">Ask Neo</span>
          <span className="text-[10.5px] font-medium text-slate-400 italic ml-1.5">by DataChannel</span>
        </div>
      </div>

      {/* Navigation Tabs (Hoverable only, non-clickable) */}
      <div className="px-3 py-3.5 space-y-1 flex-shrink-0">
        <div className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-semibold bg-[#e8eefc] text-neo-blue shadow-sm cursor-default">
          <MessageSquare size={16} className="text-neo-blue" />
          Chat
        </div>

        <div className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-semibold text-slate-800 hover:bg-slate-200/30 transition cursor-default">
          <FolderKanban size={16} className="text-slate-800" />
          Collections
        </div>

        <div className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-semibold text-slate-800 hover:bg-slate-200/30 transition cursor-default">
          <Database size={16} className="text-slate-800" />
          Sources
        </div>
      </div>

      <div className="px-3 flex-shrink-0">
        <div className="h-[1px] bg-slate-200 my-1"></div>
      </div>

      {/* Start New Thread Button (Custom OKLCH blue) */}
      <div className="px-3 py-2 flex-shrink-0">
        <button className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-md bg-neo-blue hover:bg-neo-blue-hover text-white text-[12.5px] font-semibold shadow-sm transition-all cursor-default">
          <Plus size={15} />
          Start New Thread
        </button>
      </div>

      {/* Threads Section */}
      <div className="flex-1 px-4 py-3 flex flex-col overflow-hidden">
        <p className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
          Threads
        </p>

        <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
          <div className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12.5px] font-semibold bg-[#e8eefc] text-neo-blue cursor-default">
            <MessageSquare size={13.5} className="text-neo-blue" />
            <span className="truncate">Sales Data</span>
          </div>

          <div className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12.5px] font-semibold text-slate-800 hover:bg-slate-200/30 transition cursor-default">
            <MessageSquare size={13.5} className="text-slate-800" />
            <span className="truncate">Marketing data</span>
          </div>
        </div>
      </div>

      {/* Bottom Profile and Settings */}
      <div className="mt-auto p-4 bg-[#fafbfc] flex-shrink-0">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-200/30 text-[13.5px] font-semibold text-slate-800 transition cursor-default">
          <Settings size={16.5} className="text-slate-800" />
          Settings
        </button>

        <div className="mt-4 flex items-center gap-3 px-2">
          <div className="h-9 w-9 rounded-full bg-[#d946ef] flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
            D
          </div>

          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate text-slate-700">
              DC_frontend...
            </p>

            <p className="text-xs text-[#94a3b8] truncate">
              DC_frontendtes...
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
