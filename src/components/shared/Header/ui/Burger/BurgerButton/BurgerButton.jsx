import clsx from "clsx";
import styles from "./BurgerButton.module.scss";

const BurgerButton = ({ setMenuOpened, menuOpened }) => {
  return (
    <button
      onClick={() => setMenuOpened((prev) => !prev)}
      type="button"
      className={clsx(styles.burgerIcon, menuOpened && styles.opened)}
    >
      <span></span>
    </button>
  );
};

export default BurgerButton;
