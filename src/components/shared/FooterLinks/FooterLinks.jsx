import { useTranslations } from "next-intl";
import MainLink from "../MainLink/MainLink";
import { navigationLinks } from "./constants";
import styles from "./FooterLinks.module.scss";
import { createKey } from "@/src/lib/utils/createKey";

const FooterLinks = () => {
  const t = useTranslations("Footer");

  return (
    <div className={styles.list}>
      {navigationLinks.map(({ url, name, type }) => (
        <MainLink url={url} key={createKey()} type={type}>
          {t(name)}
        </MainLink>
      ))}
    </div>
  );
};

export default FooterLinks;
