import { ReactFlowProvider } from "@xyflow/react";
import GraphCanvas from "./component/GraphCanvas";
import TopBar from "./component/TopBar";
import LeftRail from "./component/LeftRail";
import RightPanel from "./component/RightPanel";
import { useUIStore } from "./store/uiStore";
import { LayoutGrid, X } from "lucide-react";

function App() {
  const isMobilePanelOpen = useUIStore((state) => state.isMobilePanelOpen);
  const setMobilePanelOpen = useUIStore((state) => state.setMobilePanelOpen);

  return (
    <ReactFlowProvider>
      <div className="h-screen flex flex-col font-sans bg-white text-slate-900 overflow-hidden">
        
        <div className="flex items-center w-full">
          <button 
            onClick={() => setMobilePanelOpen(!isMobilePanelOpen)}
            className="md:hidden p-4 border-b border-r hover:bg-slate-50 text-slate-600"
          >
            {isMobilePanelOpen ? <X size={18} /> : <LayoutGrid size={18} />}
          </button>
          <div className="flex-1">
            <TopBar />
          </div>
        </div>

        <div className="flex flex-1 min-h-0 relative">
          <aside className="w-16 border-r bg-slate-50/60 flex-shrink-0">
            <LeftRail />
          </aside>

          <main className="flex-1 min-h-0 relative bg-slate-50/20">
            <GraphCanvas />
          </main>

          <aside className="hidden md:block w-80 border-l flex-shrink-0">
            <RightPanel />
          </aside>

          {isMobilePanelOpen && (
            <div className="md:hidden fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40" onClick={() => setMobilePanelOpen(false)} />
          )}
          
          <aside className={`md:hidden fixed top-14 bottom-0 right-0 w-80 bg-white border-l z-50 shadow-2xl transition-transform duration-250 ease-in-out transform ${
            isMobilePanelOpen ? "translate-x-0" : "translate-x-full"
          }`}>
            <RightPanel />
          </aside>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;