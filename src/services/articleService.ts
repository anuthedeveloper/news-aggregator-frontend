import api from "./api";

// setLoading(true);
// try {
// {
//   page,
//   category: filter.category,
//   source: filter.source,
//   date: filter.date,
//   keyword: filter.keyword,
// },
//   const newArticles = response.data.data;
//   setArticles((prev) => [...prev, ...newArticles]);
//   setHasMore(response.data.next_page_url !== null);
// } catch (error) {
//   console.error("Error fetching articles:", error);
// } finally {
//   setLoading(false);
// }

export const fetchArticles = async (params: Record<string, any>) => {
  const response = await api.get("/articles", {
    params,
  });
  if (response.data.error) throw new Error(response.data.message);
  return response.data;
};

export const getArticlesByPage = async (page = 1) => {
  const response = await api.get(`/articles/search?page=${page}`);
  if (response.data.error) throw new Error(response.data.message);
  return response.data;
};

export const searchArticles = async (params: Record<string, any>) => {
  const response = await api.get("/articles/search", {
    params,
  });
  if (response.data.error) throw new Error(response.data.message);
  return response.data;
};
