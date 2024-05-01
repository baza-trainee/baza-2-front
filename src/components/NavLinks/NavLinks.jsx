import MainLink from "../shared/MainLink/MainLink";
import { navigationLinks } from "./constants";
import styles from "./NavLinks.module.scss";

const NavLinks = () => {
  return (
    <div className={styles.list}>
      {navigationLinks.map(({ url, name, type }) => (
        <MainLink url={url} key={url} type={type}>
          {name}
        </MainLink>
      ))}
    </div>
  );
};

export default NavLinks;
