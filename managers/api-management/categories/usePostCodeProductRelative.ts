import { useLanguage } from "@/context/LanguageProvider";
import apiCategories from "@/services/categories/categories.services";
import { useToastStore } from "@/stores/useToastStore";
import { useQuery } from "@tanstack/react-query";

export const usePostCodeProductRelative = (code: string, type: string, isKey: string) => {
    const { setLoadingLang } = useLanguage();
    const { setToast } = useToastStore()

    const fetchCodeProductRelative = async () => {
        setLoadingLang(true);
        try {
            const dataSubmit = new FormData();
            dataSubmit.append("code", code);

            if (isKey) {
                dataSubmit.append("is_key", isKey);
            }

            const { data } = await apiCategories.postCodeProductRelative(dataSubmit);
            console.log(data);
            setLoadingLang(false);
            if (data && data.success) {
                return data;
            } else {
                // setToast(true, "error", "Vui lòng đăng nhập để xem thông tin!", 2500)
                setToast(true, "error", "Không có thông tin sản phần bạn tìm!", 2500)
                return undefined;
            }
        } catch (err) {
            throw err;
        }
    };

    return useQuery<any>({
        queryKey: ["postCodeProductRelative", code],
        queryFn: fetchCodeProductRelative,
        enabled: !!code && !!(type === "list"),
    });
};
