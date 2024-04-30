import Image from 'next/image';
import styles from './PartnerCard.module.scss';
import image from './images/deltahost.png';

export default function PartnerCard({img}) {
  return (
      <div className={styles.card}>
        <Image className={styles.imageWrapper} src={image} alt="Card image"></Image>
      </div>
  );
}