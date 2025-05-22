import { toastCore } from "@/lib/toast";
import apiAuth from "@/services/auth/auth.services";
import { useAuthStore } from "@/stores/useAuthStores";
import useCookieStore from "@/stores/useCookieStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { KEY_COOKIES } from "@/constants/Cookie";
import { useToastStore } from "@/stores/useToastStore";

export const useGetInfoByToken = () => {
    const router = useRouter();

    const { setToast } = useToastStore();

    const { removeCookie, getCookie } = useCookieStore();

    const { setInformationUser } = useAuthStore();

    const cookies = getCookie(KEY_COOKIES.WEBSITE);

    return useQuery({
        queryKey: ["getInfoByToken"],
        queryFn: async () => {
            try {
                const { data } = await apiAuth.getInfoByToken();
                if (data?.result) {
                    setInformationUser(data?.data?.client);
                    return data;
                }

                setToast(true, "error", data?.message, 2500);
                removeCookie(KEY_COOKIES.WEBSITE);
                setInformationUser(undefined);
                return {};
            } catch (err) {
                removeCookie(KEY_COOKIES.WEBSITE);
            }
        },
        placeholderData: keepPreviousData,
        retry: 3,
        gcTime: 5000,
        retryDelay: 1000,
        enabled: !!cookies,
    });
};
