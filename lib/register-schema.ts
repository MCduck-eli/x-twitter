import { create } from "zustand";

interface useRegisterModal {
    onOpen: boolean;
    isOpen: () => void;
    isClose: () => void;
}

const useRegisterSchema = create<useRegisterModal>((set) => ({
    onOpen: false,
    isOpen: () => set({ onOpen: true }),
    isClose: () => set({ onOpen: false }),
}));

export default useRegisterSchema;
