import { create } from "zustand";

export const HOW_TO_PLAY_SEEN_STORAGE_KEY = "browser-heroes-2:how-to-play:v1";

function hasSeenHowToPlay(): boolean {
	try {
		return window.localStorage.getItem(HOW_TO_PLAY_SEEN_STORAGE_KEY) === "seen";
	} catch {
		return false;
	}
}

function markHowToPlaySeen(): void {
	try {
		window.localStorage.setItem(HOW_TO_PLAY_SEEN_STORAGE_KEY, "seen");
	} catch {
		// The guide can still be dismissed when browser storage is unavailable.
	}
}

type HowToPlayModalState = {
	isOpen: boolean;
	open: () => void;
	close: () => void;
};

export const useHowToPlayModalStore = create<HowToPlayModalState>((set) => ({
	isOpen: !hasSeenHowToPlay(),
	open: () => set({ isOpen: true }),
	close: () => {
		markHowToPlaySeen();
		set({ isOpen: false });
	},
}));
