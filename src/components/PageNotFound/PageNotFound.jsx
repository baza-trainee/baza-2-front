import styles from "./PageNotFound.module.scss";
import ButtonLink from "../shared/ButtonLink/ButtonLink";

export const PageNotFound = ({ textErr, textErrBtn }) => {

  return (
    <main className={styles.mainErr}>
      <h2>404</h2>
      <p>{textErr}</p>
      <ButtonLink url="/">{textErrBtn}</ButtonLink>
    </main>
  );
};
