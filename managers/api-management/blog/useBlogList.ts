import { useLanguage } from "@/context/LanguageProvider";
import apiBlog from "@/services/blog/blog.services";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useBlogList = (params: any, enabled: boolean = true) => {
    const { setLoadingLang } = useLanguage();
    return useInfiniteQuery({
        queryKey: ["getListBlog", { ...params }],
        queryFn: async ({ pageParam = 1 }) => {
            setLoadingLang(true);
            const { data } = await apiBlog.getListBlog({
                ...params,
                page: pageParam,
                is_show_home: params.is_show_home,
            });
            setLoadingLang(false);
            return data;
        },
        staleTime: 10000,
        getNextPageParam: (lastPage: any, pages: any) => {
            return lastPage?.next_page ? pages?.length + 1 : null;
        },
        retry: 5,
        retryDelay: 5000,
        initialPageParam: 1,
        enabled: enabled,
    });
};
