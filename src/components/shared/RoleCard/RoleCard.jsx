"use client"
import Image from "next/image"
import { useState } from "react"
import styles from "./RoleCard.module.scss"
import clsx from "clsx"

const RoleCard = ({ imgSrc, shortDesc, title, children }) => {
  const [readMore, setReadMore] = useState(false)

  return (
    <article className={styles.article}>
      {imgSrc && (
        <div className={styles.imageContainer}>
          <Image sizes="100%" fill alt={title ?? "Описание отсутсвует"} src={imgSrc} />
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.shortDesc}>{shortDesc}</p>
        <button onClick={() => setReadMore(true)} className={styles.readMore}>
          Читати далі
        </button>
      </div>
      <div className={clsx(styles.fullDesc, readMore && styles.showFullDesc)}>
        <button onClick={() => setReadMore(false)} className={styles.fullDescClose}>
          <svg
            width="24"
            height="17"
            viewBox="0 0 24 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.15231 2L2 8.50081L8.15385 15M22 8.50244H2"
              stroke="#FCFCFC"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {children}
      </div>
    </article>
  )
}

export default RoleCard
