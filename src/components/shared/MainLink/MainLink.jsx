"use client";

import { Link, usePathname } from "@/src/navigation";
import styles from "./MainLink.module.scss";
import linkTypes from "./constants";
import clsx from "clsx";

const MainLink = ({
  url,
  children,
  type = linkTypes.DEFAULT,
  className,
  handleClose,
  ...rest
}) => {
  const pathname = usePathname();
  const isCurrentPage = pathname === url;

  const scrollToBottom = (event) => {
    if (type === linkTypes.BURGER) handleClose();
    if (url === "/contacts") {
      event.preventDefault();
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const linkProps = {
    className: clsx(
      styles.link,
      styles[`link--${type}`],
      isCurrentPage && styles.active,
      className
    ),
    onClick: scrollToBottom,
    ...rest,
  };

  if (url === "/contacts") {
    return <button {...linkProps}>{children}</button>;
  }

  return (
    <Link href={url} {...linkProps}>
      {children}
    </Link>
  );
};

export default MainLink;
