// src/component/RightPanel.tsx

import { useUIStore } from "../store/uiStore";
import NodeInspector from "./NodeInspector";

const apps = [
  {
    id: "payments",
    name: "Payments",
  },
  {
    id: "orders",
    name: "Orders",
  },
  {
    id: "analytics",
    name: "Analytics",
  },
];

export default function RightPanel() {
  const selectedAppId = useUIStore(
    (state) => state.selectedAppId
  );

  const setSelectedAppId = useUIStore(
    (state) => state.setSelectedAppId
  );

  return (
    <div className="h-full flex flex-col">
      {/* Apps Section */}
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold mb-4">
          Apps
        </h2>

        <div className="space-y-2">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => {
                setSelectedAppId(app.id);

                console.log(
                  "Selected App:",
                  app.id
                );
              }}
              className={`w-full text-left p-2 rounded border ${
                selectedAppId === app.id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {app.name}
            </button>
          ))}
        </div>
      </div>

      {/* Inspector */}
      <div className="flex-1 p-4 overflow-y-auto">
        <NodeInspector />
      </div>
    </div>
  );
}