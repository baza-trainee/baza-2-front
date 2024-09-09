import styles from "./mainbutton.module.scss";
import clsx from "clsx";

const buttonConfig = {
  MAIN: "main",
  MODAL: "modal",
  ADMIN:"admin"
};

export default function MainButton({
  variant = buttonConfig.MAIN,
  className,
  onClick,
  disabled,
  hiden=false,
  children,
  type = "button",
  ariaLabel,
  ...props
}) {
  const btnClass = `${
    styles[
      `btn_${
        variant === buttonConfig.MAIN || variant === buttonConfig.MODAL|| variant === buttonConfig.ADMIN
          ? variant
          : buttonConfig.MAIN
      }`
    ]
  }`;

  return (
    <button
      onClick={onClick}
      className={clsx(btnClass, className,hiden && styles._hiden)}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}
