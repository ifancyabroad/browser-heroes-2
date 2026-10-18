import { create } from "zustand";

type Sidebar = "hero" | "world";

type SidebarState = {
	activeSidebar: Sidebar | null;
	open: (sidebar: Sidebar) => void;
	close: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
	activeSidebar: null,
	open: (sidebar) => set({ activeSidebar: sidebar }),
	close: () => set({ activeSidebar: null }),
}));
