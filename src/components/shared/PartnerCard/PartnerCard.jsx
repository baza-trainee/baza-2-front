import Image from "next/image";
import Link from "next/link";
import styles from './PartnerCard.module.scss'
import clsx from "clsx";
import { useSwiperSlide } from 'swiper/react';
import { imageLoader } from "@/src/lib/hooks/createImageUrl";

export default function PartnerCard({ item, className }) {
  const { homeUrl={}, imageUrl, name } = item;
  const swiperSlide = useSwiperSlide();

  return (
    <Link
      href={homeUrl}
      className={clsx(styles.partnerCardItem, swiperSlide?.isActive || className ? styles._active: styles._disabled, className)}
      rel="noopener noreferrer"
      target="_blank">
      <div className={styles.img_wrap}>
        <Image
          loader={imageLoader}
          className={styles.img}
          src={imageUrl}
          alt={name}
          fill
          sizes="100%"
          />
      </div>
    </Link>
  );
}