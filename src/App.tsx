import GraphCanvas from "./component/GraphCanvas";
import TopBar from "./component/TopBar";
import LeftRail from "./component/LeftRail";
import RightPanel from "./component/RightPanel";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <TopBar />

      <div className="flex flex-1 min-h-0">
        {/* Left Rail */}
        <aside className="w-16 border-r flex-shrink-0">
          <LeftRail />
        </aside>

        {/* Canvas */}
        <main className="flex-1 min-h-0">
          <GraphCanvas />
        </main>

        {/* Right Panel */}
        <aside className="w-80 border-l">
          <RightPanel />
        </aside>
      </div>
    </div>
  );
}

export default App;
