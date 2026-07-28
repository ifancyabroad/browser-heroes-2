import { create } from "zustand";

type AuthModal = "login" | "register" | null;

type AuthModalState = {
	modal: AuthModal;
	openLogin: () => void;
	openRegister: () => void;
	close: () => void;
};

export const useAuthModalStore = create<AuthModalState>((set) => ({
	modal: null,
	openLogin: () => set({ modal: "login" }),
	openRegister: () => set({ modal: "register" }),
	close: () => set({ modal: null }),
}));
