"use client";
import style from "./LangDropdown.module.scss";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { locales } from "@/src/i18n";
import { usePathname, useRouter } from "@/src/navigation";
import { Icon } from "../Icon/Icon";
import clsx from "clsx";
import switchLocaleAdmin from "@/src/state/switchLocaleAdmin";

export default function LangDropdown(type) {
  const router = useRouter();
  const path = usePathname();
  const locale = useLocale();
  const localeAdmin = switchLocaleAdmin(state => state.localeAdmin);
  const switchLocale = switchLocaleAdmin(state => state.switchLocale);

  const [currentLocale, setCurrentLocale] = useState(type ? localeAdmin : locale);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const submenuRef = useRef(null);

  const handleCheckLocale = (item) => {
    setIsOpen(!isOpen);
    setCurrentLocale(item);
    if(type){
      switchLocale(item)
    }else router.replace(path, { locale: item });
  };

  const handleOutsideClick = (event) => {
    if (
      !submenuRef.current?.contains(event.target) &&
      !(
        event.target === menuRef.current ||
        menuRef.current?.contains(event.target)
      )
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  const ariaLabelsText = (locale) => {
    const labels = {
      ua: {
        btn_lang: "для зміни мови сторінки. вибрана мова",
        btn_item: "обрати мову",
      },
      en: {
        btn_lang: "switch language pages. selected language",
        btn_item: "select the language",
      },
      pl: {
        btn_lang: "zmień język strony. wybrany język",
        btn_item: "wybierz język",
      },
    };
    return labels[locale];
  };

  return (
    <div className={style.box}>
      <button
        ref={menuRef}
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(style.btn_lang, isOpen && style._active)}
        type="button"
        aria-label={ariaLabelsText(currentLocale).btn_lang}
      >
        <span>{currentLocale.toUpperCase()}</span>
        <span className={clsx(style.btn_icon, isOpen && style.btn_icon_up)}>
          <Icon name="intl-select-arrow" />
        </span>
      </button>
      {isOpen && (
        <div ref={submenuRef} className={style.options}>
          {locales.map((item) =>
            item !== currentLocale ? (
              <button
                className={style.options_item_btn}
                key={item}
                onClick={() => handleCheckLocale(item)}
                type="button"
                aria-label={ariaLabelsText(currentLocale).btn_item}
              >
                {item.toUpperCase()}
              </button>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
