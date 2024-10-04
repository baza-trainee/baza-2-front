import styles from './ImagePreview.module.scss'
import clsx from 'clsx'
import { useState } from 'react'
import Image from 'next/image'
import { imageLoader } from '@/src/lib/hooks/createImageUrl'
import { Icon } from '@/src/components/shared/Icon/Icon'

export default function ImagePreview({imageUrl, variant=''}) {
  const[ full, setFull ] = useState(false)

  return (
    <div className={clsx(styles.preview, variant && styles[`_${variant}`], full && styles._full)}>
      <div className={styles.slideCardItem}>

        <button type='button' onClick={()=>{setFull(!full)}}>
          <Icon name={full?'normal_screen':'full_screen'} 
            width={30} 
            height={30}/>
        </button>
        <div className={styles.img_wrap}>
          <Image
            className={clsx(styles.img, !imageUrl && styles._no_image)}
            loader={imageLoader}
            src={imageUrl ? imageUrl : '/images/placeholder-image/no-image.png'}
            alt={'Попередній перегляд'}
            fill
            sizes="100%"
            />
        </div>
      </div>
    </div>
  )
}