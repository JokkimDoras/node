export default function TopBar() {
    return (
      <header className="h-14 border-b px-4 flex items-center justify-between">
        <h1 className="font-semibold text-lg">
          App Graph Builder
        </h1>
  
        <div className="flex gap-2">
          <button className="border px-3 py-1 rounded">
            Fit View
          </button>
  
          <button className="border px-3 py-1 rounded">
            Settings
          </button>
        </div>
      </header>
    );
  }