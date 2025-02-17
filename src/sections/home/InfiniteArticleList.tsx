import React, { useRef, useCallback } from "react";
import Spinner from "../../components/ui/Spinner";
import { useArticles } from "../../hooks/useArticles";
import { formatDateToString } from "../../utils/functions";

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
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
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
    <div className="max-w-4xl mx-auto px-6 lg:px-8">
      <h4 className="text-xl font-semibold mb-10">Recent News</h4>

      {/* <div className="grid md:grid-cols-3 gap-6"> */}
      {/* Article List */}
      <div className="md:col-span-2 space-y-6">
        {data?.pages.map((page, pageIndex) =>
          page.data.map((article: any, index: number) => {
            if (page.data.length === index + 1) {
              return (
                <div
                  ref={lastArticleRef}
                  key={article.id}
                  className="flex flex-col md:flex-row items-start space-x-4 border-b pb-4"
                >
                  <div className="flex-1 text-left">
                    <a
                      href={article.url}
                      className="text-xl md:text-lg font-bold text-blue-600 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {article.title}
                    </a>
                    <p className="text-base text-gray-900 font-normal mb-4">
                      By {article.author} -{" "}
                      {formatDateToString(article.published_at)}
                    </p>
                    <p className="mb-3 text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      {article.description}
                    </p>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={article.id}
                  className="flex flex-col md:flex-row items-start space-x-4 border-b pb-4"
                >
                  <div className="flex-1 text-left">
                    <h2 className="text-xl md:text-lg font-bold text-blue-600 hover:underline">
                      {article.title}
                    </h2>
                    <p className="text-base text-gray-900 font-normal mb-4">
                      By {article.author} -{" "}
                      {formatDateToString(article.published_at)} -{" "}
                      {article.category}
                    </p>
                    <p className="mb-3 text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      {article.description}
                    </p>
                  </div>
                </div>
              );
            }
          })
        )}

        {isFetchingNextPage && <p>Loading more articles...</p>}
      </div>
      {/* </div> */}
    </div>
  );
};

export default InfiniteArticleList;
