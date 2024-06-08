import { create } from 'zustand';

const stateBurgerMenu = create((set, get) => ({
	isOpen: false,
	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false }),
	toggle: () => set({ isOpen: !get().isOpen }),
}))

export default stateBurgerMenu