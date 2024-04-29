import { Link } from "@/src/navigation";
import styles from "./MainLink.module.scss";
import linkTypes from "./constants";

const MainLink = ({ url, children, type = linkTypes.DEFAULT }) => {
  const linkClass = `${styles.link} ${styles[`link--${type}`]}`;

  return (
    <Link href={url} className={linkClass}>
      {children}
    </Link>
  );
};
export default MainLink;
