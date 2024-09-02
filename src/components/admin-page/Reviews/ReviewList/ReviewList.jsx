import styles from './ReviewList.module.scss'
import { useState } from 'react';
import { useRouter } from '@/src/navigation';
import { createKey } from '@/src/lib/utils/createKey';
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { Icon } from '@/src/components/shared/Icon/Icon'
import AdminModal from '@/src/components/modals/AdminModal/AdminModal'
import FeedbackCard from '@/src/components/shared/FeedbackCard/FeedbackCard';
import switchLocaleAdmin from '@/src/state/switchLocaleAdmin';
import MessageErrorLoading from '@/src/components/shared/MessageErrorLoading/MessageErrorLoading';

export default function ReviewList({data, hendleRemove}) {
  const router = useRouter();

    // Мова сторінки.
    const locale = switchLocaleAdmin(state => state.localeAdmin);
  // Шляхи сторінок
  const editReviewPath = '/admin/reviews/edit'
 
  const[ idReview, setIdIdReview ] = useState(null)

  const closeModal=()=>{
    setIdIdReview(null)
  }

  const okRemove=()=>{
    hendleRemove(idReview)
    setIdIdReview(null)
  }

  return(
    <>
      {data?.length ? <ul className={styles.list}>
        {data.map((el)=>{
          return <li key={createKey()} className={styles.item}>
            <FeedbackCard {...el} locale={locale}/>
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
        <MessageErrorLoading variant='search'/> 
      }

      <AdminModal isOpen={idReview} handleCallback={closeModal} handleOkCallback={okRemove} title={'Ви впевнені, що хочете видалити відгук?'} btnBlok={true}></AdminModal>
    </>
  )
}