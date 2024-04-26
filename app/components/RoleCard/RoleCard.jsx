"use client"
import Image from "next/image"
import { useState } from "react"
import styles from "./RoleCard.module.scss"

const RoleCard = ({ imgSrc, shortDesc, title, fullDesc }) => {
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
      {readMore && (
        <div onClick={() => setReadMore(false)} className={styles.fullDesc}>
          <p>{fullDesc}</p>
        </div>
      )}
    </article>
  )
}

export default RoleCard
