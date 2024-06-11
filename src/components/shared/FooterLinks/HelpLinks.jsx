import React from "react";
import { helpLinks } from "./constants";
import styles from "./HelpLinks.module.scss";
import { createKey } from "@/src/lib/utils/createKey";
import { useTranslations } from "next-intl";
import MainLink from "../MainLink/MainLink";

const HelpLinks = () => {
  const t = useTranslations("Footer");

  return (
    <div className={styles.helpList}>
      {helpLinks.map(({ url, name, type, openInNewTab }) => (
        <MainLink
          url={url}
          key={createKey()}
          type={type}
          openInNewTab={openInNewTab}
        >
          {t(name)}
        </MainLink>
      ))}
    </div>
  );
};

export default HelpLinks;
