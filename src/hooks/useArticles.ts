import { useInfiniteQuery } from "@tanstack/react-query";
import { getArticlesByPage } from "../services/articleService";

// export const useArticles = (filters: Record<string, any>) => {
//   return useQuery({
//     queryKey: ["articles", filters],
//     queryFn: () => fetchArticles(filters),
//     staleTime: Infinity,
//   });
// };
interface LastPage {
  current_page: number;
  last_page: number;
  data: any[];
}

export const useArticles = () => {
  return useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: ({ pageParam = 1 }) => getArticlesByPage(pageParam),
    getNextPageParam: (lastPage: LastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
  });
};
