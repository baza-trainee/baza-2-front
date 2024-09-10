"use client";

import { Link, usePathname } from "@/src/navigation";
import styles from "./MainLink.module.scss";
import linkTypes from "./constants";
import clsx from "clsx";

const MainLink = ({
  url,
  name,
  children,
  type = linkTypes.DEFAULT,
  className,
  handleClose,
  openInNewTab,
  ...rest
}) => {
  const pathname = usePathname();

  const isActive = (name) => {
    if (pathname === "/" && name === "main") {
      return true;
    }
    return pathname.split("/").includes(name);
  };

  const handleClick = (event) => {
    if (type === linkTypes.BURGER) handleClose();
    if (type === linkTypes.HELP || type === linkTypes.DOCS) {
      event.preventDefault();
      return;
    }
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
      isActive(name) && styles.active,
      className
    ),
    onClick: handleClick,
    ...rest,
  };

  if (openInNewTab) {
    linkProps.target = "_blank";
    linkProps.rel = "noopener noreferrer";
  }

  if (
    type === linkTypes.HELP ||
    url === "/contacts" ||
    type === linkTypes.DOCS
  ) {
    return <button {...linkProps}>{children}</button>;
  }

  return (
    <Link href={url} {...linkProps}>
      {children}
    </Link>
  );
};

export default MainLink;
