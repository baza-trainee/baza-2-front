import Image from "next/image";
import Link from "next/link";
import styles from './PartnerCard.module.scss'
import clsx from "clsx";
import { useSwiperSlide } from 'swiper/react';

export default function PartnerCard({ item }) {

  const { imgUrl, homeUrl, name } = item;

  const swiperSlide = useSwiperSlide();

  return (
    <Link
      href={homeUrl}
      className={clsx(styles.partnerCardItem, swiperSlide.isActive ? styles._active: styles._disabled)}
      rel="noopener noreferrer"
      target="_blank">
      <div className={styles.img_wrap}>
        <Image
          className={styles.img}
          src={imgUrl}
          alt={name}
          fill
          sizes="100%"
          />
      </div>
    </Link>
  );
}