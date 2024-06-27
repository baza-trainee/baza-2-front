import Image from "next/image";
import Link from "next/link";
import styles from './PartnerCard.module.scss'
import clsx from "clsx";
import { useSwiperSlide } from 'swiper/react';
import { useQuery } from "@tanstack/react-query";
import { exampleService } from "@/src/services/example-service";

export default function PartnerCard({ item }) {
  const { homeUrl={}, imageUrl, name } = item;
  const swiperSlide = useSwiperSlide();
  // const { isLoading, isError, data, error }= useQuery({ queryKey: ['image'], queryFn:()=> exampleService.getImage(imageUrl)})

  // if(isLoading){return <h1>Loading....</h1>}
  //console.log(`https://baza-trainee.tech/api/v1/files/${imageUrl}`)

  return (
    <Link
      href={homeUrl}
      className={clsx(styles.partnerCardItem, swiperSlide.isActive ? styles._active: styles._disabled)}
      rel="noopener noreferrer"
      target="_blank">
      <div className={styles.img_wrap}>
        <Image
          className={styles.img}
          //src={imgUrl}
          src={`https://baza-trainee.tech/api/v1/files/${imageUrl}`}
          alt={name}
          fill
          sizes="100%"
          />
      </div>
    </Link>
  );
}