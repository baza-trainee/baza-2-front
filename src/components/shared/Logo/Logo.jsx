"use client";

import styles from "./Logo.module.scss";
import clsx from "clsx";
import { Link } from "@/src/navigation";
import { Icon } from "../Icon/Icon";

const logoConfig = {
  HEADER: "header",
  FOOTER: "footer",
  URL: "/",
};
// variant - 'header' або 'footer' за замовчуванням 'header'. ariaLabel - для посилання
export default function Logo({
  variant = logoConfig.HEADER,
  className,
  ariaLabel,
}) {
  const logoClass = `${
    styles[
      variant === logoConfig.HEADER || variant === logoConfig.FOOTER
        ? variant
        : logoConfig.HEADER
    ]
  }`;

  return (
    <Link
      href={logoConfig.URL}
      className={clsx(logoClass, className)}
      aria-label={ariaLabel}
    >
      <Icon className={styles.logo} name="logo" />
    </Link>
  );
}
