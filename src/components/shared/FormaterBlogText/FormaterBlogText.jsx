import styles from "./FormaterBlogText.module.scss";
import { createKey } from "@/src/lib/utils/createKey";
import { ReplaceLinks } from "../ReplaceLinks/ReplaceLinks";

export default function FormaterBlogText(text, className) {
  const rows = text.split(/\r\n|\r|\n/g);

  return (
    <>
      {rows.map((row) => {
        const formattedRow = ReplaceLinks(row);

        if (row.length == 1) {
          return (
            <div key={createKey()} className={styles.paragraph}>
              {formattedRow.map((el) => el)}
            </div>
          );
        } else {
          return (
            <p key={createKey()} className={className}>
              {formattedRow.map((el) => el)}
            </p>
          );
        }
      })}
    </>
  );
}
