
import styles from './SliderList.module.scss'

import MainButton from '@/src/components/shared/MainButton/MainButton'
import { Icon } from '@/src/components/shared/Icon/Icon'
import AdminModal from '@/src/components/modals/AdminModal/AdminModal'
import { useRouter } from '@/src/navigation';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { createKey } from '@/src/lib/utils/createKey';
import HeroCard from '@/src/components/shared/HeroCard/HeroCard';

export default function SliderList({data, hendleRemove}) {
  const router = useRouter();
  // Шляхи сторінок
  const editSlidePath = '/admin/slider/edit-slide'

  // Мова сторінки.
  const { locale } = useParams();
 
  const[ idSlide, setIdIdSlide ] = useState(null)

  const closeModal=()=>{
    setIdIdSlide(null)
  }

  const okRemove=()=>{
    hendleRemove(idSlide)
    setIdIdSlide(null)
  }

  return(
    <>
      {data?.length ? <ul className={styles.list}>
        {data.map((el)=>{
          return <li key={createKey()} className={styles.item}>
            <HeroCard title={el.title[locale]} desc={el.subtitle[locale]} className={styles.heroCard} img={el.imageUrl}/>
            <div className={styles.btns}>
              <MainButton variant='admin' 
                className={styles.btn} 
                onClick={()=>{router.push(`${editSlidePath}/${el._id}`)}}>
                <Icon  width={24} height={24} name='edit'/>
              </MainButton>

              <MainButton variant='admin' onClick={()=>{setIdIdSlide(el._id)}} className={styles.btn}>
                <Icon width={24} height={24} name='remove'/>
              </MainButton>
            </div>
          </li>
        })}
        </ul> : 
        <>
          <p className={styles.length}>Вибачте, інформації не знайдено.</p>
          <p className={styles.length}>Додайте слайд.</p>
        </>
      }

      <AdminModal isOpen={idSlide} handleCallback={closeModal} handleOkCallback={okRemove} title={'Ви впевнені, що хочете видалити слайд?'} btnBlok={true}></AdminModal>
    </>
  )
}