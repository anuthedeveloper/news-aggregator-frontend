import React, { useRef, useCallback } from "react";
import { useArticles } from "../hooks/useArticles";
import Spinner from "./ui/Spinner";

const InfiniteArticleList: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useArticles();

  const observer = useRef<IntersectionObserver | null>(null);

  const lastArticleRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  if (isLoading) return <Spinner />;
  if (isError) return <p>Failed to load articles.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {data?.pages.map((page, pageIndex) =>
        page.data.map((article: any, index: number) => {
          if (page.data.length === index + 1) {
            return (
              <div
                ref={lastArticleRef}
                key={article.id}
                className="p-4 bg-white shadow rounded-md"
              >
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <p className="text-gray-600">{article.author}</p>
                <p>{article.description}</p>
              </div>
            );
          } else {
            return (
              <div key={article.id} className="p-4 bg-white shadow rounded-md">
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <p className="text-gray-600">{article.author}</p>
                <p>{article.description}</p>
              </div>
            );
          }
        })
      )}

      {isFetchingNextPage && <p>Loading more articles...</p>}
    </div>
  );
};

export default InfiniteArticleList;
