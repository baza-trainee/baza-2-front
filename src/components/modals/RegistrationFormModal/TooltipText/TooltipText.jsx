import styles from './TooltipText.module.scss'
import clsx from 'clsx'
import Image from 'next/image'
import { useTranslations } from 'use-intl';

export default function TooltipText({className}) {
  const t = useTranslations("Modal_form");
  return(
    <div className={clsx(styles.tooltiptext, className)}>
      <h4>{t("discord_tooltip_text")}</h4>
      <p>{t("discord_tooltip_example")}</p>
      <div className={styles.wrapp_img}>
        <Image src={'/images/forms/example_discord.jpg'} fill sizes='100%' alt='example discord'/>
      </div>
    </div>
  )
}