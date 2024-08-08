'use client';
import styles from './Reviews.module.scss'
import SectionAdmin from '../SectionAdmin/SectionAdmin'
import { Icon } from '../../shared/Icon/Icon'
import MainButton from '../../shared/MainButton/MainButton'
import { useRouter } from '@/src/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteReviewById, getAllReviews } from '@/src/api/reviews';
import ReviewList from './ReviewList/ReviewList';
import Loader from '../../shared/loader/Loader';
import UseAlert from '../../shared/UseAlert/UseAlert';
import stateUseAlert from '@/src/state/stateUseAlert';

export default function Reviews() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
  const addReviewPath = '/admin/reviews/add-review'
  // Запит на базу 1
  const { isError, data, refetch } = useQuery({ queryKey: ['reviews'], 
    queryFn:getAllReviews});

  const deleteReview = useMutation({
    mutationFn:(id) => {
      return deleteReviewById(id)
    },onSuccess: () => {
      refetch()
    },onError:()=>{
      open('error', false)
    }})

 return( 
    <SectionAdmin title={'Відгуки'} lang={true}>
      <MainButton  variant='admin' className={styles.btn} onClick={()=>{
          router.push(addReviewPath)
        }}>
          <Icon name={'plus_icon'} width={24} height={24} />
        {'Додати відгук'}</MainButton >
      
      {isError ?
        <>
          <p className={styles.error}>Помилка завантаження контенту.</p>
          <p className={styles.error}>Оновіть сторінку або спробуйте пізніше.</p>
        </>:
        <>
          {data && <ReviewList data={data} hendleRemove={ deleteReview.mutate }/>}
        </>
      }

      { deleteReview.isPending && <Loader/> }

      <UseAlert/>
    </SectionAdmin>
  )
}