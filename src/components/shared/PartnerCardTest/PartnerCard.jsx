import Image from "next/image";
import Link from "next/link";
import styles from './PartnerCard.module.scss'
import clsx from "clsx";
import { useSwiperSlide } from 'swiper/react';

export default function PartnerCard({ item }) {
  const { img, url } = item;
  const swiperSlide = useSwiperSlide();

  //console.log(swiperSlide)

//   {swiperSlide.isActive
//     "isActive": false,
//     "isVisible": true,
//     "isPrev": false,
//     "isNext": true
// },!swiperSlide.isVisible || !swiperSlide.isPrev || !swiperSlide.isNext && styles._hiden


  return (
    // <div className={styles.partnerCardItem}>
      <Link
       href={url}
       className={clsx(styles.partnerCardItem, !swiperSlide.isActive && styles._disabled)}
       rel="noopener noreferrer"
       target="_blank">
        <div className={styles.img_wrap}>
          <Image
            className={clsx(styles.img,swiperSlide.isActive && styles._active)}
            // style={{
            //   objectFit: "cover",
            //   borderRadius: "18px", //👈 and here you can select border radius
            // }}
            src={img}
            alt="Card image"
            fill
            sizes="100%"
            />
        </div>
      </Link>
    // </div>
  );
}
