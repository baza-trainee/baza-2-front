'use client';
import styles from './Slider.module.scss'
import SectionAdmin from '../SectionAdmin/SectionAdmin'
import { Icon } from '../../shared/Icon/Icon'
import MainButton from '../../shared/MainButton/MainButton'
import { useRouter } from '@/src/navigation';
import { useQuery } from '@tanstack/react-query';
import { getAllSliders } from '@/src/api/hero-slider';
import SliderList from './SliderList/SliderList';

export default function Slider() {
  const router = useRouter();

  const addSlidePath = '/admin/slider/add-slide'

  const { isError, data, refetch } = useQuery({ queryKey: ['slider'], 
    queryFn:()=>{return getAllSliders()}});

   console.log(data?.results) 


 return( 
    <SectionAdmin title={'Слайдер'} lang={true}>
      <div className={styles.wrapper}>
        <MainButton  variant='admin' className={styles.btn} onClick={()=>{
          router.push(addSlidePath)
        }}>
          <Icon name={'plus_black'} width={24} height={24} />
          {'Додати слайд'}</MainButton >
      </div>
      {data?.results && <SliderList data={data?.results}/>}
      {/* {isError ?
        <>
          <p className={styles.error}>Помилка завантаження контенту.</p>
          <p className={styles.error}>Оновіть сторінку або спробуйте пізніше.</p>
        </>:
        <>
          {data?.results && 
            <PartnerList data={data?.results} hendleRemove={deletePartner.mutate}/>
          }
        </>
      } */}
      {/* {deletePartner.isPending && <Loader/>}
      <UseAlert/> */}
    </SectionAdmin>
  )
}