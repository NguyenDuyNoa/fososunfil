import { create } from "zustand";

interface InitialStateStore {
    isStateHeader: {
        isActiveService: boolean;
        isShowMenuScreen: boolean;
        selectedCodeCountry: string;
        isHeaderFixed: boolean;
    };
    queryKeyIsStateHeader: (key: any) => void;
    setHeaderFixed: (isFixed: boolean) => void;
}

export const useStateHeader = create<InitialStateStore>((set) => ({
    isStateHeader: {
        isActiveService: false,
        isShowMenuScreen: false,
        selectedCodeCountry: "",
        isHeaderFixed: false,
    },
    queryKeyIsStateHeader: (key: any) =>
        set((state) => ({
            ...state,
            isStateHeader: {
                ...state.isStateHeader,
                ...key,
            },
        })),
    setHeaderFixed: (isFixed: boolean) =>
        set((state) => ({
            ...state,
            isStateHeader: {
                ...state.isStateHeader,
                isHeaderFixed: isFixed,
            },
        })),
}));
