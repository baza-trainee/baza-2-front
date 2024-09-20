"use client";

import { createKey } from "@/src/lib/utils/createKey";
import InputSearch from "../../shared/inputs/InputSearch/InputSearch";
import SocialIcons from "../../shared/SocialIcons/SocialIcons";
import LoadMore from "../../shared/LoadMore/LoadMore";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import stateSorryModal from "@/src/state/stateSorryModal";
import { getAllBlogArticles } from "@/src/api/blog";
import { createImageUrl } from "@/src/lib/hooks/createImageUrl";
import styles from "./BlogSection.module.scss";
import clsx from "clsx";
import Loader from "../../shared/loader/Loader";
import MessageErrorLoading from "../../shared/MessageErrorLoading/MessageErrorLoading";
import SorryModal from "../../modals/SorryModal/SorryModal";
import BlogCard from "./BlogCard/BlogCard";

const BlogSection = () => {
  const t = useTranslations("Blog");
  const [searchQuery, setSearchQuery] = useState("");

  const queryClient = useQueryClient();
  const open = stateSorryModal((state) => state.open);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["blog", searchQuery],

    queryFn: ({ pageParam = 1 }) =>
      getAllBlogArticles({ page: pageParam, search: searchQuery, limit: 4 }),
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist =
        lastPage?.pagination.currentPage < lastPage?.pagination.totalPages;
      return morePagesExist ? allPages.length + 1 : undefined;
    },
  });

  const handleSearchChange = (value = "") => {
    setSearchQuery(value);
    if (value === "" && searchQuery) {
      queryClient.resetQueries(["projects"], { exact: true });
    }
  };

  useEffect(() => {
    if (data?.pages[0].results.length === 0) {
      open();
    }
  }, [data]);

  return (
    <section className={styles.section}>
      <div className={styles.BlogContainer}>
        {isLoading && <Loader />}
        {isError && <MessageErrorLoading className={styles.fullHeight} />}
        {!isError && !isLoading && (
          <>
            <InputSearch
              defaultValue={searchQuery}
              onSubmit={handleSearchChange}
              placeholder={t("placeholder")}
            />
            <div className={styles.wrapper}>
              <SocialIcons classNameCustom={styles.icons} />
              <div className={styles.pages}>
                {data?.pages.map((page) => (
                  <div key={createKey()} className={styles.page}>
                    {page.results.map((item) => (
                      <BlogCard
                        key={createKey()}
                        id={item._id}
                        img={createImageUrl(item.imageUrl)}
                        title={item.title}
                        description={item.text}
                        date={item.date}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <LoadMore
          className={clsx(styles.loadMore, !hasNextPage && styles.hidden)}
          disabled={isFetchingNextPage}
          text={t("load_more")}
          onClick={() => fetchNextPage()}
        />
        <SorryModal handleCallback={handleSearchChange} />
      </div>
    </section>
  );
};

export default BlogSection;
