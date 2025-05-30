import { useLanguage } from "@/context/LanguageProvider";
import { useCommonListQueryKeys } from "@/hooks/query-key/common-list/useCommonListQueryKeys";
import apiBlog from "@/services/blog/blog.services";
import apiCategories from "@/services/categories/categories.services";
import { useInfiniteQuery } from "@tanstack/react-query";

type SearchHistoryListProps = {
    valueSearchCode?: string
    limit?: string | number | any
    enabled?: boolean
}



export const useSearchHistoryList = ({ valueSearchCode, limit, enabled }: SearchHistoryListProps = { enabled: true }) => {
    const { setLoadingLang } = useLanguage();

    const { keySearchHistory } = useCommonListQueryKeys()

    const { key } = keySearchHistory.list({ valueSearchCode: valueSearchCode });

    console.log('key', key);

    const fetchSearchHistoryList = async ({ pageParam = 1 }) => {
        setLoadingLang(true);
        console.log('pageParam', pageParam);

        const { data } = await apiCategories.getSearchHistoryList(pageParam, limit, valueSearchCode);
        setLoadingLang(false);
        return data;
    }

    return useInfiniteQuery({
        queryKey: [...key],
        queryFn: fetchSearchHistoryList,
        staleTime: 10000,
        getNextPageParam: (lastPage: any, pages: any) => {
            if (lastPage?.data?.next) {
                return lastPage?.data?.next ? pages?.length + 1 : null;
            }
            return null;
        },
        retry: 3,
        retryDelay: 5000,
        initialPageParam: 1,
        enabled: enabled,
    });
};
