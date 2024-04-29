import Image from 'next/image';
import styles from './StructureCard.module.scss';

export default function StructureCard({header, text, image}) {
  
  return (
      <div className={styles.cardStyle}>
        <Image src={image} alt="Card Image" width={300} height={157} /> 
        <div className={styles.textCard}>
          <div>
            <h2>{header}BAZA TRAINEE UKRAINE</h2>
            <p>{text}Громадський проєкт для джуніорів і  світчерів ІТ, який побудований на створенні цифрових проєктів для соціальної сфери України</p>        
          </div>
        </div>
      </div>
  );
}