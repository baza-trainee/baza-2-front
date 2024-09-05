"use client";

import { createKey } from "@/src/lib/utils/createKey";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import LoadMore from "../shared/LoadMore/LoadMore";
import { createImageUrl } from "@/src/lib/hooks/createImageUrl";
import { getAllProjects } from "@/src/api/projects";
import ProjectCard from "./ProjectCard/ProjectCard";
import InputSearch from "../shared/inputs/InputSearch/InputSearch";
import clsx from "clsx";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../shared/loader/Loader";
import stateSorryModal from "@/src/state/stateSorryModal";
import styles from "./Projects.module.scss";
import SorryModal from "../modals/SorryModal/SorryModal";
import MessageErrorLoading from "../shared/MessageErrorLoading/MessageErrorLoading";

const Projects = () => {
  const t = useTranslations("Projects");
  const locale = useLocale();

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
    queryKey: ["projects", searchQuery],

    queryFn: ({ pageParam = 1 }) =>
      getAllProjects({ page: pageParam, search: searchQuery, limit: 6 }),
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist =
        lastPage?.pagination.currentPage < lastPage?.pagination.totalPages;
      return morePagesExist ? allPages.length + 1 : undefined;
    },
  });

  const handleSearchChange = (value = "") => {
    setSearchQuery(value);
    if (value === "") {
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
      <div className={styles.projectsContainer}>
        {isLoading && <Loader />}
        {isError && <MessageErrorLoading/>}
        <h1 className={styles.title}>{t("title")}</h1>
        <InputSearch
          className={styles.search}
          onSubmit={handleSearchChange}
          defaultValue={searchQuery}
          placeholder={t("placeholder")}
        />
        <div className={styles.pagesWrapper}>
          {data?.pages.map((page, i) => (
            <div key={i} className={styles.content}>
              {page.results.map((project) => (
                <ProjectCard
                  key={createKey()}
                  project={project}
                  locale={locale}
                  coverImgUrl={createImageUrl(project.imageUrl)}
                />
              ))}
            </div>
          ))}
        </div>
        <LoadMore
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          text={t("load_more")}
          className={clsx(styles.loadMore, !hasNextPage && styles.hidden)}
        />
      </div>
      <SorryModal handleCallback={handleSearchChange} />
    </section>
  );
};

export default Projects;
