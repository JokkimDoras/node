// src/component/NodeInspector.tsx

import { useState } from "react";
import { useUIStore } from "../store/uiStore";

export default function NodeInspector() {
  const selectedNodeId = useUIStore(
    (state) => state.selectedNodeId
  );

  const activeInspectorTab = useUIStore(
    (state) => state.activeInspectorTab
  );

  const setActiveInspectorTab = useUIStore(
    (state) => state.setActiveInspectorTab
  );

  const [value, setValue] = useState(50);

  if (!selectedNodeId) {
    return (
      <div className="text-gray-500">
        Select a node from the canvas
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        Service Node Inspector
      </h2>

      {/* Status */}
      <div>
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
          Healthy
        </span>
      </div>

      {/* Tabs */}
      <div className="flex border rounded overflow-hidden">
        <button
          onClick={() =>
            setActiveInspectorTab("config")
          }
          className={`flex-1 p-2 ${
            activeInspectorTab === "config"
              ? "bg-gray-200"
              : ""
          }`}
        >
          Config
        </button>

        <button
          onClick={() =>
            setActiveInspectorTab("runtime")
          }
          className={`flex-1 p-2 ${
            activeInspectorTab === "runtime"
              ? "bg-gray-200"
              : ""
          }`}
        >
          Runtime
        </button>
      </div>

      {/* Config */}
      {activeInspectorTab === "config" && (
        <>
          <div>
            <label className="block mb-1">
              Node ID
            </label>

            <input
              value={selectedNodeId}
              readOnly
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-1">
              Node Name
            </label>

            <input
              defaultValue={`Node ${selectedNodeId}`}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-1">
              Traffic %
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) =>
                setValue(
                  Number(e.target.value)
                )
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-1">
              Value
            </label>

            <input
              type="number"
              value={value}
              onChange={(e) =>
                setValue(
                  Number(e.target.value)
                )
              }
              className="w-full border rounded p-2"
            />
          </div>
        </>
      )}

      {/* Runtime */}
      {activeInspectorTab === "runtime" && (
        <div className="space-y-2">
          <p>
            <strong>Status:</strong> Healthy
          </p>

          <p>
            <strong>CPU:</strong> 25%
          </p>

          <p>
            <strong>Memory:</strong> 512 MB
          </p>
        </div>
      )}
    </div>
  );
}