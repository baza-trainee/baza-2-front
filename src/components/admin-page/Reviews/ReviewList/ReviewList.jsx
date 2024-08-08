import styles from './ReviewList.module.scss'
import { useState } from 'react';
import { useRouter } from '@/src/navigation';
import { createKey } from '@/src/lib/utils/createKey';
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { Icon } from '@/src/components/shared/Icon/Icon'
import AdminModal from '@/src/components/modals/AdminModal/AdminModal'
import FeedbackCard from '@/src/components/shared/FeedbackCard/FeedbackCard';

export default function ReviewList({data, hendleRemove}) {
  const router = useRouter();
  // Шляхи сторінок
  const editReviewPath = '/admin/reviews/edit-review'
 
  const[ idReview, setIdIdReview ] = useState(null)

  const closeModal=()=>{
    setIdIdReview(null)
  }

  const okRemove=()=>{
    hendleRemove(idReview)
    setIdIdReview(null)
  }

  const reverseData=(data)=>{
    return data.reverse()
  }
  //.reverse()
  return(
    <>
      {data?.length ? <ul className={styles.list}>
        {data.map((el)=>{
          return <li key={createKey()} className={styles.item}>
            <FeedbackCard {...el}/>
            <div className={styles.btns}>
              <MainButton variant='admin' 
                className={styles.btn} 
                onClick={()=>{router.push(`${editReviewPath}/${el._id}`)}}>
                <Icon  width={24} height={24} name='edit'/>
              </MainButton>

              <MainButton variant='admin' onClick={()=>{setIdIdReview(el._id)}} className={styles.btn}>
                <Icon width={24} height={24} name='remove'/>
              </MainButton>
            </div>
          </li>
        })}
        </ul> : 
        <>
          <p className={styles.length}>Вибачте, інформації не знайдено.</p>
          <p className={styles.length}>Додайте відгук.</p>
        </>
      }

      <AdminModal isOpen={idReview} handleCallback={closeModal} handleOkCallback={okRemove} title={'Ви впевнені, що хочете видалити відгук?'} btnBlok={true}></AdminModal>
    </>
  )
}