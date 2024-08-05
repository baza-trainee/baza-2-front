import styles from './ReviewList.module.scss'
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/src/navigation';
import { createKey } from '@/src/lib/utils/createKey';
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { Icon } from '@/src/components/shared/Icon/Icon'
import AdminModal from '@/src/components/modals/AdminModal/AdminModal'
import FeedbackCard from '@/src/components/shared/FeedbackCard/FeedbackCard';
import { formatDate } from '@/src/lib/utils/formatData';

export default function ReviewList({data, hendleRemove}) {
  const router = useRouter();
  // Шляхи сторінок
  const editReviewPath = '/admin/reviews/edit-review'

  // Мова сторінки.
  const { locale } = useParams();
 
  const[ idReview, setIdIdReview ] = useState(null)

  const closeModal=()=>{
    setIdIdReview(null)
  }

  const okRemove=()=>{
    hendleRemove(idSlide)
    setIdIdReview(null)
  }

//   {
//     "name": {
//         "en": "Vitaliy",
//         "pl": "Witalij",
//         "ua": "Віталій"
//     },
//     "review": {
//         "en": "The project is built on the win-win principle, when both parties reinforce each other for the benefit of the community. Great idea!",
//         "pl": "Projekt opiera się na zasadzie win-win, gdy obie strony wzmacniają się nawzajem z korzyścią dla społeczności. Świetny pomysł!",
//         "ua": "Проєкт побудовано за принципом win-win, коли обидві сторони підсилюють один одного на користь спільноти. Чудова ідея!"
//     },
//     "_id": "6515c10b812102a60b6458a5",
//     "role": "БФ",
//     "date": 1684800000000,
//     "imageUrl": "1697453993471.png",
//     "__v": 0
// }
  //console.log(data)
  //{ image, name, role, date, text }


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