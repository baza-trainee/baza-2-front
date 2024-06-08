"use client";

import clsx from "clsx";
import styles from "./BurgerButton.module.scss";
import stateBurgerMenu from "@/src/state/stateBurgerMenu";

const BurgerButton = () => {
  const isOpen = stateBurgerMenu((state) => state.isOpen);
  const toggle = stateBurgerMenu((state) => state.toggle);

  return (
    <button
      onClick={() => toggle()}
      type="button"
      className={clsx(styles.burgerIcon, isOpen && styles.opened)}
    >
      <span></span>
    </button>
  );
};

export default BurgerButton;
