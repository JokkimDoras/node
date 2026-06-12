import { useUIStore } from "../store/uiStore";
import { apps } from "../api/mockApi";
import NodeInspector from "./NodeInspector";

export default function RightPanel() {
  const selectedAppId = useUIStore((state) => state.selectedAppId);
  const setSelectedAppId = useUIStore((state) => state.setSelectedAppId);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b p-4">
        <h2 className="text-sm font-bold tracking-tight text-slate-400 uppercase mb-3">Target Application Environments</h2>
        <div className="space-y-1.5">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => setSelectedAppId(app.id)}
              className={`w-full text-left text-sm px-3 py-2 rounded-md font-medium border transition-all ${
                selectedAppId === app.id ? "bg-blue-600 border-blue-600 text-white shadow-sm" : "border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              {app.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-sm font-bold tracking-tight text-slate-400 uppercase mb-3">Metadata Properties</h2>
        <NodeInspector />
      </div>
    </div>
  );
}