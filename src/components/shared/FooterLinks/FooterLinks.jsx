import MainLink from "../MainLink/MainLink";
import { helpLinks, navigationLinks } from "./constants";
import styles from "./FooterLinks.module.scss";

const FooterLinks = () => {
  return (
    <div className={styles.footerLinks}>
      <div className={styles.list}>
        {navigationLinks.map(({ url, name, type }) => (
          <MainLink url={url} key={url} type={type}>
            {name}
          </MainLink>
        ))}
      </div>
      <div className={styles.helpList}>
        {helpLinks.map(({ url, name, type }) => (
          <MainLink url={url} key={url} type={type}>
            {name}
          </MainLink>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
