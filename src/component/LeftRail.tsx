import { LayoutDashboard, Network, Settings } from "lucide-react";

export default function LeftRail() {
  return (
    <div className="h-full flex flex-col items-center py-4 gap-5 text-slate-400">
      <div className="p-2 rounded-lg bg-blue-50 text-blue-600 cursor-pointer"><Network size={20} /></div>
      <div className="p-2 rounded-lg hover:bg-slate-100 hover:text-slate-600 cursor-pointer transition-colors"><LayoutDashboard size={20} /></div>
      <div className="p-2 rounded-lg hover:bg-slate-100 hover:text-slate-600 cursor-pointer transition-colors"><Settings size={20} /></div>
    </div>
  );
}