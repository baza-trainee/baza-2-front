import clsx from "clsx"
import Image from "next/image"
import styles from "./CarouselButton.module.scss"

const CarouselButton = ({ className, ...props }) => {
  return (
    <button className={clsx(styles.sliderButton, className)} {...props}>
      <Image
        quality={100}
        width={19}
        height={30}
        alt="arrow"
        src="/images/icons/carousel-arrow.svg"
      />
    </button>
  )
}

export default CarouselButton
