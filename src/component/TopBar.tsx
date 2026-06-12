import { useReactFlow } from "@xyflow/react";

export default function TopBar() {
  const { fitView } = useReactFlow();

  return (
    <header className="h-14 px-4 flex items-center justify-between bg-white border-b w-full">
      <div className="flex items-center gap-2.5">
        <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">¶</div>
        <h1 className="font-bold text-sm tracking-tight text-slate-800">Application Architecture Canvas</h1>
      </div>
      <div className="flex gap-1.5">
        <button onClick={() => fitView({ duration: 350 })} className="text-xs font-semibold border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-md transition-all shadow-2xs">Fit Window View</button>
        <button className="text-xs font-semibold border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-md transition-all shadow-2xs">System Parameters</button>
      </div>
    </header>
  );
}