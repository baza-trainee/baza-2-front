import clsx from "clsx"
import "./CarouselPagination.scss"

const CarouselPagination = ({ className, ...props }) => {
  return <div className={clsx("sliderPagination", className)} {...props}></div>
}

export default CarouselPagination
