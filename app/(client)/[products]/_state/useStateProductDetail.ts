import { create } from "zustand";

interface InitialStateStore {
    isStateProductDetail: {
        idTabActive: any;
    };
    queryKeyIsStateProductDetail: (key: any) => void;
}

export const useStateProductDetail = create<InitialStateStore>((set) => ({
    isStateProductDetail: {
        idTabActive: 3,
    },
    queryKeyIsStateProductDetail: (key: any) =>
        set((state) => ({
            ...state,
            isStateProductDetail: {
                ...state.isStateProductDetail,
                ...key,
            },
        })),
}));
