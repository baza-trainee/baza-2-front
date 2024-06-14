import Image from "next/image";

import Link from "next/link";
import styles from './PartnerCard.module.scss'

export default function PartnerCard({ item }) {
  const { img, url } = item;

  return (
    <div className={styles.partnerCardItem}>
      <Link
       href={url}
       rel="noopener noreferrer"
       target="_blank">
        <div className={styles.img}>
          <Image
            src={img}
            alt="Card image"
            fill
            sizes="100%"
            />
        </div>
      </Link>
    </div>
  );
}
