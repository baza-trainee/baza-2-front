import Link from "next/link";
import styles from "./PageNotFound.module.scss";

export const PageNotFound = ({ textErr, textErrBtn }) => {
  return (
    <main className={styles.mainErr}>
      <h2>404</h2>
      <p>{textErr}</p>
      <Link className={styles.btnBack} href="/">
        {textErrBtn}
      </Link>
    </main>
  );
};
