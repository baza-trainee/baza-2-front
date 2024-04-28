import MainLink from "../shared/MainLink/MainLink";
import { navigationLinks } from "./constants";
import styles from "./FooterLinks.module.scss";

const FooterLinks = () => {
  return (
    <div className={styles.list}>
      {navigationLinks.map(({ url, name }) => (
        <MainLink url={url} key={url}>
          {name}
        </MainLink>
      ))}
    </div>
  );
};

export default FooterLinks;
