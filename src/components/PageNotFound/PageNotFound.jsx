import styles from "./PageNotFound.module.scss";
import ButtonLink from "../shared/ButtonLink/ButtonLink";

export const PageNotFound = ({ textErr, textErrBtn }) => {
  return (
    <main className={styles.mainErr}>
      <p className={styles.numbers}>404</p>
      <p>{textErr}</p>
      <ButtonLink url="/">{textErrBtn}</ButtonLink>
    </main>
  );
};
