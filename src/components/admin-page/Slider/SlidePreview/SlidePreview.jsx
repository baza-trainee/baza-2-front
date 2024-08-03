import Image from 'next/image'
import styles from './SlidePreview.module.scss'
import clsx from 'clsx'
import { useState } from 'react'
import { createImageUrl } from '@/src/lib/hooks/createImageUrl'
import { Icon } from '@/src/components/shared/Icon/Icon'

export default function SlidePreview({imageUrl}) {
  const[ full, setFull ] = useState(false)

  return (
    <div className={clsx(styles.preview,full && styles._full)}>
      <div className={styles.slideCardItem}>

        <button type='button' onClick={()=>{setFull(!full)}}>
          <Icon name={full?'normal_screen':'full_screen'} width={30} height={30}/>
        </button>
        <div className={styles.img_wrap}>
          <Image
            className={styles.img}
            src={imageUrl ? createImageUrl(imageUrl) :'/images/placeholder-image/no-image.png'}
            alt={'Попередній перегляд'}
            fill
            sizes="100%"
            />
        </div>
      </div>
    </div>
  )
}