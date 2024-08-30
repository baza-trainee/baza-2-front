'use client';
import styles from './Slider.module.scss'
import SectionAdmin from '../SectionAdmin/SectionAdmin'
import { Icon } from '../../shared/Icon/Icon'
import MainButton from '../../shared/MainButton/MainButton'
import { useRouter } from '@/src/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteSlideById, getAllSliders } from '@/src/api/hero-slider';
import SliderList from './SliderList/SliderList';
import Loader from '../../shared/loader/Loader';
import UseAlert from '../../shared/UseAlert/UseAlert';
import stateUseAlert from '@/src/state/stateUseAlert';

export default function Slider() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
 
  const addSlidePath = '/admin/slider/add'

  const { isError, data, refetch } = useQuery({ queryKey: ['slider'], 
    queryFn:()=>{return getAllSliders()}});

  const deleteSlide = useMutation({
    mutationFn:(id) => {
      return deleteSlideById(id)
    },onSuccess: () => {
      refetch()
    },onError:()=>{
      open('error', false)
    }})


 return( 
    <SectionAdmin title={'Слайдер'} lang={true}>
      {data?.results.length < 5 ? 
        <div className={styles.wrapper}>
          <MainButton  variant='admin' className={styles.btn} onClick={()=>{
              router.push(addSlidePath)
            }}>
              <Icon name={'plus_black'} width={24} height={24} />
              {'Додати слайд'}</MainButton >
        </div>:
        <div className={styles.info}>
          <p className={styles.error}>Максимальна кількість п'ять слайдів.</p>
          <p className={styles.error}>Доступне лише редагування.</p>
        </div>
      }
      
      {isError ?
       <MessageErrorLoading variant='admin'/> :
        <>
          {data?.results && <SliderList data={data?.results} hendleRemove={ deleteSlide.mutate }/>}
        </>
      }

      { deleteSlide.isPending && <Loader/> }

      <UseAlert/>
    </SectionAdmin>
  )
}