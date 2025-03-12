import { create } from "zustand/react";

const useSessionStore = create((set) => ({
	isLoggedIn: false,
	userId: false,
	signIn: () => set({ isLoggedIn: true }),
	signOut: () => set({ isLoggedIn: false })
}));

export default useSessionStore;
