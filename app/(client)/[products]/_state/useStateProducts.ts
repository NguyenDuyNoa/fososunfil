import { create } from "zustand";

interface InitialStateStore {
    isStateHome: {
        idTabActive: any;
    };
    queryKeyIsStateHome: (key: any) => void;
}

export const useStateProducts = create<InitialStateStore>((set) => ({
    isStateHome: {
        idTabActive: undefined,
    },
    queryKeyIsStateHome: (key: any) =>
        set((state) => ({
            ...state,
            isStateHome: {
                ...state.isStateHome,
                ...key,
            },
        })),
}));
