"use client";

import BackBtn from "./BackBtn/BackBtn";
import BlogArticle from "./BlogArticle/BlogArticle";
import SocialIcons from "../../shared/SocialIcons/SocialIcons";
import styles from "./BlogArticleSection.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getBlogArticleById } from "@/src/api/blog";
import { useParams } from "next/navigation";
import Loader from "../../shared/loader/Loader";
import MessageErrorLoading from "../../shared/MessageErrorLoading/MessageErrorLoading";

const BlogArticleSection = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogArticleById(id),
  });

  return (
    <section className={styles.section}>
      {isLoading && <Loader />}
      {isError && <MessageErrorLoading />}
      {data && !isError && (
        <>
          <BackBtn />
          <div className={styles.wrapper}>
            <SocialIcons classNameCustom={styles.socIcons} />
            <div className={styles.articleWrapper}>
              <BlogArticle
                imgUrl={data.imageUrl}
                title={data.title}
                text={data.text}
                date={data.date}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default BlogArticleSection;
