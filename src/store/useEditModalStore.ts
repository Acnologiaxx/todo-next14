import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useEditModalStore = create<ModalState>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useEditModalStore;