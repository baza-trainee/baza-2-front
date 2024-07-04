
import { createKey } from "@/src/lib/utils/createKey";
import BlogCard from "../shared/BlogCard/BlogCard";
import InputSearch from "../shared/InputSearch/InputSearch";
import { items } from "./items";
import styles from "./BlogSection.module.scss"
import SocialIcons from "../shared/SocialIcons/SocialIcons";
import LoadMore from "../shared/LoadMore/LoadMore";
 
const  BlogSection=()=> {
    return (
      <section className={styles.section}>
        <InputSearch />
        <div className={styles.wrapper}>
          <SocialIcons classNameCustom={styles.icons} />
          <ul className={styles.list}>
            {items.map((el) => (
              <BlogCard key={createKey()} item={el} />
            ))}
          </ul>
            </div>
            <LoadMore/>
      </section>
    );
}

export default BlogSection;