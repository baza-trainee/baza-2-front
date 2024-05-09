import { useTranslations } from "next-intl";
import MainLink from "../MainLink/MainLink";
import { helpLinks, navigationLinks } from "./constants";
import styles from "./FooterLinks.module.scss";

const FooterLinks = () => {
  const t = useTranslations("Footer");

  return (
    <div className={styles.footerLinks}>
      <div className={styles.list}>
        {navigationLinks.map(({ url, name, type }) => (
          <MainLink url={url} key={url} type={type}>
            {t(name)}
          </MainLink>
        ))}
      </div>
      <div className={styles.helpList}>
        {helpLinks.map(({ url, name, type }) => (
          <MainLink url={url} key={url} type={type}>
            {t(name)}
          </MainLink>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
