import { useTranslations } from "next-intl";
import MainLink from "../MainLink/MainLink";
import { helpLinks, navigationLinks } from "./constants";
import styles from "./FooterLinks.module.scss";
import { createKey } from "../../../lib/utils/createKey";

const FooterLinks = () => {
  const t = useTranslations("Footer");

  return (
    <div className={styles.footerLinks}>
      <div className={styles.list}>
        {navigationLinks.map(({ url, name, type }) => {
          const liKey = createKey();
          return (
            <MainLink url={url} key={liKey} type={type}>
              {t(name)}
            </MainLink>
          );
        })}
      </div>
      <div className={styles.helpList}>
        {helpLinks.map(({ url, name, type }) => {
          const liKey = createKey();
          return (
            <MainLink url={url} key={liKey} type={type}>
              {t(name)}
            </MainLink>
          );
        })}
      </div>
    </div>
  );
};

export default FooterLinks;
