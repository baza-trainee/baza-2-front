"use client";

import { CSSTransition } from "react-transition-group";
import clsx from "clsx";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { links } from "./links";
import styles from "./BurgerMenu.module.scss";
import { usePathname, useRouter } from "next/navigation";

const BurgerMenu = ({ menuOpened, setMenuOpened }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRouteChange = useCallback(() => {
    setMenuOpened((prev) => !prev);
  }, []);

  //при переходе на какуюто страницу закрываем бургер и тоглим стейт в 'false'
  // useEffect(() => {
  //   router.events.on("routeChangeStart", handleRouteChange);

  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChange);
  //   };
  // }, []);

  // useBodyLock(openedMenu);

  return (
    <nav className={clsx(styles.burgerMenu, menuOpened && styles.opened)}>
      <ul className={styles.burgerList}>
        {links.map((link, i) => {
          const isCurrentPage = pathname === link.href;

          return (
            <CSSTransition
              classNames={{ enterDone: styles.Done }}
              in={menuOpened}
              key={i}
              timeout={link.timeout}
            >
              <li className={styles.burgerMenuItem}>
                <Link
                  href={link.href}
                  className={clsx(
                    styles.burgerMenuLink,
                    isCurrentPage && styles.active
                  )}
                >
                  {link.content}
                </Link>
              </li>
            </CSSTransition>
          );
        })}
      </ul>
    </nav>
  );
};

export default BurgerMenu;
