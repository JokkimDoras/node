import { create } from "zustand";

type InspectorTab = "config" | "runtime";

interface UIStore {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: InspectorTab;
  setSelectedAppId: (id: string | null) => void;
  setSelectedNodeId: (id: string | null) => void;
  setMobilePanelOpen: (open: boolean) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: "config",

  setSelectedAppId: (id) =>
    set({
      selectedAppId: id,
      selectedNodeId: null, // Clear node selection context on app shift
    }),

  setSelectedNodeId: (id) =>
    set({
      selectedNodeId: id,
    }),

  setMobilePanelOpen: (open) =>
    set({
      isMobilePanelOpen: open,
    }),

  setActiveInspectorTab: (tab) =>
    set({
      activeInspectorTab: tab,
    }),
}));