"use client";

import React from "react";
import { helpLinks } from "./constants";
import styles from "./HelpLinks.module.scss";
import { createKey } from "@/src/lib/utils/createKey";
import { useTranslations } from "next-intl";
import MainLink from "../MainLink/MainLink";
import downloadPdf from "@/src/lib/hooks/downloadPdf";

const HelpLinks = () => {
  const t = useTranslations("Footer");

  return (
    <div className={styles.helpList}>
      {helpLinks.map(({ url, name, type }) => (
        <MainLink
          url={url}
          key={createKey()}
          type={type}
          onClick={() => downloadPdf(url)}
        >
          {t(name)}
        </MainLink>
      ))}
    </div>
  );
};

export default HelpLinks;
