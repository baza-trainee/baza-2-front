import styles from "./mainbutton.module.scss";

const buttonConfig = {
  MAIN: "main",
  MODAL: "modal",
};

export default function MainButton({
  variant = buttonConfig.MAIN,
  className,
  onClick,
  disabled,
  children,
  type = "button",
  ariaLabel,
  ...props
}) {
  const btnClass = `${
    styles[
      `btn_${
        variant === buttonConfig.MAIN || variant === buttonConfig.MODAL
          ? variant
          : buttonConfig.MAIN
      }`
    ]
  }`;

  return (
    <button
      onClick={onClick}
      className={clsx(btnClass, className)}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}
