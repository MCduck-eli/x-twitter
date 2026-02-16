import { create } from "zustand";

interface useEditModal {
    onOpen: boolean;
    isOpen: () => void;
    isClose: () => void;
}

const useEdit = create<useEditModal>((set) => ({
    onOpen: false,
    isOpen: () => set({ onOpen: true }),
    isClose: () => set({ onOpen: false }),
}));

export default useEdit;
