import { create } from "zustand";

interface DialogStore {
    openDialogCustom: boolean;
    statusDialog: string;
    productData: any;
    setOpenDialogCustom: (key: boolean) => void;
    setStatusDialog: (type: string) => void;
    setProductData: (data: any) => void;
    handleOpenDialog: (status: string, type_device: string) => void;
    setHandleOpenDialog: (handler: (status: string, type_device: string) => void) => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
    openDialogCustom: false,
    statusDialog: "",
    productData: null,
    handleOpenDialog: () => {},
    setOpenDialogCustom: (key: boolean) => set((state) => ({ ...state, openDialogCustom: key })),
    setStatusDialog: (type: string) => set((state) => ({ ...state, statusDialog: type })),
    setProductData: (data: any) => set((state) => ({ ...state, productData: data })),
    setHandleOpenDialog: (handler) => set((state) => ({ ...state, handleOpenDialog: handler })),
}));