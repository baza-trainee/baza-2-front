
import { createKey } from "@/src/lib/utils/createKey";
import BlogCard from "../shared/BlogCard/BlogCard";
import InputSearch from "../shared/InputSearch/InputSearch";
import { items } from "../ArticlesSection/items";
import styles from "./BlogSection.module.scss"
 
const  BlogSection=()=> {
    return (
      <section className={styles.section}>
        <InputSearch />
        <ul className={styles.list}>
          {items.map((el) => (
            <BlogCard key={createKey()} item={el} />
          ))}
        </ul>
      </section>
    );
}

export default BlogSection;