import Link from "next/link";
import styles from "./MainLink.module.scss";

const MainLink = ({ url, children }) => {
  return (
    <Link href={url} className={styles.link}>
      {children}
    </Link>
  );
};
export default MainLink;
