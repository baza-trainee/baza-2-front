import clsx from "clsx"
import styles from "./CarouselButton.module.scss"
import { Icon } from "../../Icon/Icon"

const CarouselButton = ({ className, ...props }) => {
  return (
    <button className={clsx(styles.sliderButton, className)} {...props}>
      <Icon name="carousel-arrow" />
    </button>
  )
}

export default CarouselButton
