import type { AchievementUnlockView } from "@app/shared";
import { create } from "zustand";

type AchievementToast = {
	id: number;
	unlock: AchievementUnlockView;
};

type AchievementToastState = {
	toasts: AchievementToast[];
	showAchievementUnlocks: (unlocks: readonly AchievementUnlockView[]) => void;
	dismissAchievementUnlock: (id: number) => void;
};

let nextToastId = 1;

export const useAchievementToastStore = create<AchievementToastState>((set) => ({
	toasts: [],
	showAchievementUnlocks: (unlocks) =>
		set((state) => ({
			toasts: [...state.toasts, ...unlocks.map((unlock) => ({ id: nextToastId++, unlock }))],
		})),
	dismissAchievementUnlock: (id) =>
		set((state) => ({
			toasts: state.toasts.filter((toast) => toast.id !== id),
		})),
}));
