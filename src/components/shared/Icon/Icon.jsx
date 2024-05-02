import clsx from "clsx"

export function Icon({ name, className, viewBox, width, height, ...props }) {
  return (
    <svg
      width={width}
      height={height}
      className={clsx("icon", className)}
      viewBox={viewBox}
      focusable="false"
      aria-hidden
      {...props}
    >
      <use href={`/sprite/sprite.svg#${name}`} />
    </svg>
  )
}
