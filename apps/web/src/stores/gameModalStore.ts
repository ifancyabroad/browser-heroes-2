import { create } from "zustand";

export const HOW_TO_PLAY_SEEN_STORAGE_KEY = "browser-heroes-2:how-to-play:v1";
export type GameModal = "stats" | "equipment" | "skills" | "combatLog" | "howToPlay";

function hasSeenHowToPlay(): boolean {
	try {
		return window.localStorage.getItem(HOW_TO_PLAY_SEEN_STORAGE_KEY) === "seen";
	} catch {
		return false;
	}
}

type GameModalState = {
	modal: GameModal | null;
	open: (modal: GameModal) => void;
	close: () => void;
};

export const useGameModalStore = create<GameModalState>((set, get) => ({
	modal: hasSeenHowToPlay() ? null : "howToPlay",
	open: (modal) => set({ modal }),
	close: () => {
		if (get().modal === "howToPlay") {
			try {
				window.localStorage.setItem(HOW_TO_PLAY_SEEN_STORAGE_KEY, "seen");
			} catch {
				// The guide can still be dismissed when browser storage is unavailable.
			}
		}
		set({ modal: null });
	},
}));
