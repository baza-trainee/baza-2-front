import clsx from "clsx"

const CarouselButton = ({ className, ref, ...props }) => {
  return (
    <button className={clsx("slider-button", className)} ref={ref} {...props}>
      arrow
    </button>
  )
}

export default CarouselButton
