import { create } from "zustand";

type ErrorModalState = {
	message: string | null;
	showError: (message: string) => void;
	hideError: () => void;
};

export const useErrorModalStore = create<ErrorModalState>((set) => ({
	message: null,
	showError: (message) => set({ message }),
	hideError: () => set({ message: null }),
}));
