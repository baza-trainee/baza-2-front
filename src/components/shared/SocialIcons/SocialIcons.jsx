import { Icon } from "../Icon/Icon";
import styles from "./SocialIcons.module.scss";

const SocialIcons = () => {
  return (
    <div className={styles.list}>
      <a
        href="https://www.linkedin.com/company/baza-trainee-ukraine/"
        className={styles.link}
      >
        <Icon name="linkedin" width={48} height={48} className={styles.icon} />
      </a>
      <a href="https://www.facebook.com/BazaIT/">
        <Icon name="facebook" width={48} height={48} className={styles.icon} />
      </a>
      <a href="https://www.facebook.com/BazaIT/">
        <Icon name="telegram" width={48} height={48} className={styles.icon} />
      </a>
    </div>
  );
};

export default SocialIcons;
