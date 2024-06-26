import Image from "next/image";
import Link from "next/link";
import styles from './PartnerCard.module.scss'
import clsx from "clsx";
import { useSwiperSlide } from 'swiper/react';

export default function PartnerCard({ item }) {
<<<<<<< HEAD
  const { imgUrl, homeUrl, name } = item;
=======
  const { img, url } = item;
>>>>>>> ca534da8c034fcd36204ea9b71a8ec8379104017
  const swiperSlide = useSwiperSlide();

  return (
    <Link
<<<<<<< HEAD
      href={homeUrl}
=======
      href={url}
>>>>>>> ca534da8c034fcd36204ea9b71a8ec8379104017
      className={clsx(styles.partnerCardItem, swiperSlide.isActive ? styles._active: styles._disabled)}
      rel="noopener noreferrer"
      target="_blank">
      <div className={styles.img_wrap}>
        <Image
          className={styles.img}
<<<<<<< HEAD
          src={imgUrl}
          alt={name}
=======
          src={img}
          alt="Card image"
>>>>>>> ca534da8c034fcd36204ea9b71a8ec8379104017
          fill
          sizes="100%"
          />
      </div>
    </Link>
  );
}