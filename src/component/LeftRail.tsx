import {
  Home,
  Boxes,
  Settings,
} from "lucide-react";

export default function LeftRail() {
  return (
    <div className="h-full flex flex-col items-center py-4 gap-6">
      <Home size={20} />
      <Boxes size={20} />
      <Settings size={20} />
    </div>
  );
}