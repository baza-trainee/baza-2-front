import styles from "./MainLink.module.scss";
import Link from "next/link";

const MainLink = ({ url, children }) => {
  return (
    <Link href={url} className={styles.link}>
      {children}
    </Link>
  );
};
export default MainLink;
