"use client";

import { createKey } from "@/src/lib/utils/createKey";
import BlogCard from "../../shared/BlogCard/BlogCard";
import InputSearch from "../../shared/InputSearch/InputSearch";
import { items } from "./items";
import styles from "./BlogSection.module.scss";
import SocialIcons from "../../shared/SocialIcons/SocialIcons";
import LoadMore from "../../shared/LoadMore/LoadMore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { getSearchParamsObject } from "@/src/lib/utils/getSearchParamsObject";

const BlogSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (data) => {
      const params = new URLSearchParams(searchParams.toString());
      data?.map((el) => params.set(Object.keys(el), Object.values(el)));

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const paramsObject = getSearchParamsObject(searchParams);
    const { page } = paramsObject;
    if (!page) {
      router.push(`${pathname}?${createQueryString([{ page: "1" }])}`);
      return;
    }
  }, []);

  const onSubmit = (value) => {
    router.push(
      `${pathname}?${createQueryString([{ page: "1" }, { query: value }])}`
    );
  };

  const handlerClickMore = () => {
    const currentPage = searchParams.get("page");
    const nextPage = Number(currentPage) + 1;
    router.push(`${pathname}?${createQueryString([{ page: nextPage }])}`);
  };

  return (
    <section className={styles.section}>
      <InputSearch onSubmit={onSubmit} />
      <div className={styles.wrapper}>
        <SocialIcons classNameCustom={styles.icons} />
        <ul className={styles.list}>
          {items.map((el) => (
            <BlogCard key={createKey()} item={el} pathname={pathname} />
          ))}
        </ul>
      </div>
      <LoadMore onClick={handlerClickMore} />
    </section>
  );
};

export default BlogSection;
