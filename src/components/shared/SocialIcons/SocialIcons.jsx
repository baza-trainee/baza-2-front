import Link from "next/link";
import { Icon } from "../Icon/Icon";
import styles from "./SocialIcons.module.scss";

const SocialIcons = () => {
  return (
    <div>
      <a href="https://www.linkedin.com/company/baza-trainee-ukraine/">
        <Icon name="linkedin" className={styles.icon} />
      </a>
      <a href="https://www.facebook.com/BazaIT/">
        <Icon name="facebook" className={styles.icon} />
      </a>
      <a href="https://www.facebook.com/BazaIT/" className={styles.link}>
        <Icon name="telegram" className={styles.icon} />
      </a>
    </div>
  );
};

export default SocialIcons;
