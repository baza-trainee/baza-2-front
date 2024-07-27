import BackBtn from "../../shared/BackBtn/BackBtn";
import BlogArticle from "../../shared/BlogArticle/BlogArticle";
import SocialIcons from "../../shared/SocialIcons/SocialIcons";
import styles from "./BlogArticleSection.module.scss";

const BlogArticleSection = () => {
  return (
    <section className={styles.section}>
      <BackBtn />
      <div className={styles.wrapper}>
        <SocialIcons classNameCustom={styles.socIcons} />
        <BlogArticle />
      </div>
    </section>
  );
};

export default BlogArticleSection;
