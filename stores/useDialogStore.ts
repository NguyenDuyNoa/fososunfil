import { create } from "zustand";

interface DialogStore {
    openDialogCustom: boolean;
    statusDialog: string;
    setOpenDialogCustom: (key: boolean) => void;
    setStatusDialog: (type: string) => void;
    handleOpenDialog: (status: string, type_device: string) => void;
    setHandleOpenDialog: (handler: (status: string, type_device: string) => void) => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
    openDialogCustom: false,
    statusDialog: "",
    handleOpenDialog: () => {},
    setOpenDialogCustom: (key: boolean) => set((state) => ({ ...state, openDialogCustom: key })),
    setStatusDialog: (type: string) => set((state) => ({ ...state, statusDialog: type })),
    setHandleOpenDialog: (handler) => set((state) => ({ ...state, handleOpenDialog: handler })),
}));