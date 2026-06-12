import { useUIStore } from "../store/uiStore";
import { useNodes, useReactFlow } from "@xyflow/react";
import { updateMockNodeData } from "../api/mockApi";

interface ServiceNodeData {
  label: string;
  status: "Healthy" | "Degraded" | "Down";
  value: number;
}

export default function NodeInspector() {
  const selectedNodeId = useUIStore((state) => state.selectedNodeId);
  const selectedAppId = useUIStore((state) => state.selectedAppId);
  const activeInspectorTab = useUIStore((state) => state.activeInspectorTab);
  const setActiveInspectorTab = useUIStore((state) => state.setActiveInspectorTab);

  const { setNodes } = useReactFlow();
  const nodes = useNodes();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNodeId || !selectedNode) {
    return <div className="text-slate-400 text-sm text-center py-6">Select a node to configure metadata.</div>;
  }

  const nodeData = selectedNode.data as unknown as ServiceNodeData;
  const { label = "", status = "Healthy", value = 50 } = nodeData || {};

  const updateNodeData = (key: keyof ServiceNodeData, newValue: any) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === selectedNodeId) {
          return { ...n, data: { ...n.data, [key]: newValue } };
        }
        return n;
      })
    );

    if (selectedAppId) {
      updateMockNodeData(selectedAppId, selectedNodeId, { [key]: newValue });
    }
  };

  const handleValueSync = (val: number) => {
    const limitedVal = Math.min(Math.max(val, 0), 100);
    updateNodeData("value", isNaN(limitedVal) ? 0 : limitedVal);
  };

  return (
    <div className="space-y-5">
      <div>
        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
          status === "Healthy" ? "bg-green-50 text-green-700 border-green-200" :
          status === "Degraded" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-red-50 text-red-700 border-red-200"
        }`}>
          ● {status}
        </span>
      </div>

      <div className="flex bg-slate-100 p-1 rounded-md border border-slate-200">
        {(["config", "runtime"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveInspectorTab(tab)}
            className={`flex-1 text-xs font-medium py-1 px-2 rounded ${
              activeInspectorTab === tab ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeInspectorTab === "config" ? (
        <div className="space-y-3.5">
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">Node Reference ID</label>
            <input value={selectedNodeId} readOnly className="w-full bg-slate-50 text-slate-400 border rounded p-1.5 text-sm font-mono cursor-not-allowed" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">Service Identifier Name</label>
            <input value={label} onChange={(e) => updateNodeData("label", e.target.value)} className="w-full border rounded p-1.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">Traffic Volume (%)</label>
            <div className="flex items-center gap-3">
              <input type="range" min="0" max="100" value={value} onChange={(e) => handleValueSync(Number(e.target.value))} className="flex-1 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              <input type="number" min="0" max="100" value={value} onChange={(e) => handleValueSync(Number(e.target.value))} className="w-14 border rounded p-1 text-center text-sm font-bold text-slate-800" />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2 text-xs bg-slate-50 p-2.5 rounded border border-slate-200 font-medium text-slate-600">
          <p><strong>System Status Context:</strong> {status}</p>
          <p><strong>Compute Capacity (CPU):</strong> {Math.round(value * 0.35)}%</p>
          <p><strong>Active Thread Memory Pool:</strong> {value * 6} MB</p>
        </div>
      )}
    </div>
  );
}