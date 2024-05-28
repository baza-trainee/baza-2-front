import styles from './JoinProjectCard.module.scss';
import { useTranslations } from "next-intl";
import { Icon } from '../Icon/Icon';

export default function JoinProjectCard(item) {
  const t = useTranslations("How_we_work.join_project_section");

  const { text_1, text_2, text_3, title, icon } = item;

  return (
    <div className={styles.card}>
      <div className={styles.svGWrapper}>
      <img
        className={styles.icon}  
        height={324}  
        width={145}
        src={icon}>
      </img>

      </div>
      <div className={styles.textCard}>
        <div className={styles.titleWrapper}>
          {t(title)}
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.text}>
          <Icon name="check" width={24} heigth={24}/>

            {t(text_1)}
          </div>
          <div className={styles.text}>
            <div className={styles.checkboxWrapper}>
              <Icon name="check" width={24} heigth={24}/>
            </div>
            {t(text_2)}
          </div>
          <div className={styles.text}>
          <Icon name="check" width={24} heigth={24}/>

            {t(text_3)}
          </div>
        </div>
      </div>
    </div>
  );
}
