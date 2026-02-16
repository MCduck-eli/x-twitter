import { create } from "zustand";

interface useLoginModal {
    onOpen: boolean;
    isOpen: () => void;
    isClose: () => void;
}

const useLoginSchema = create<useLoginModal>((set) => ({
    onOpen: false,
    isOpen: () => set({ onOpen: true }),
    isClose: () => set({ onOpen: false }),
}));

export default useLoginSchema;
