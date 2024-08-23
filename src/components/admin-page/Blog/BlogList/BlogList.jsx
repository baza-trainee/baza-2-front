import styles from './BlogList.module.scss'
import { useState } from 'react';
import { useRouter } from '@/src/navigation';
import { createKey } from '@/src/lib/utils/createKey';
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { Icon } from '@/src/components/shared/Icon/Icon'
import AdminModal from '@/src/components/modals/AdminModal/AdminModal'
import switchLocaleAdmin from '@/src/state/switchLocaleAdmin';
import Pagination from '../../Pagination/Pagination';

import { createImageUrl } from '@/src/lib/hooks/createImageUrl';
import { formatDate, formatDateToNumeric } from '@/src/lib/utils/formatData';
import BlogCard from './BlogCard/BlogCard';

export default function BlogList({data, hendleRemove, hendleSetPage}) {
  const router = useRouter();

  // Мова сторінки.
    const locale = switchLocaleAdmin(state => state.localeAdmin);
  // Шляхи сторінок
  const editBlogArticlePath = '/admin/blog/edit'
 
  const[ idArticle, setIdIdArticle ] = useState(null)

  const closeModal=()=>{
    setIdIdArticle(null)
  }

  const okRemove=()=>{
    hendleRemove(idArticle)
    setIdIdArticle(null)
  }

  return(
    <>
      {data?.results?.length ? <ul className={styles.list}>
        {data.results?.map((el)=>{
          return <li key={createKey()} className={styles.item}>

            <BlogCard data={el}/>

            <div className={styles.btns}>
              <MainButton variant='admin' 
                className={styles.btn} 
                onClick={()=>{router.push(`${editBlogArticlePath}/${el._id}`)}}>
                <Icon  width={24} height={24} name='edit'/>
              </MainButton>

              <MainButton variant='admin' onClick={()=>{setIdIdArticle(el._id)}} className={styles.btn}>
                <Icon width={24} height={24} name='remove'/>
              </MainButton>
            </div>
          </li>
        })}

        {data.pagination.totalPages > 1 && <li className={styles.pagination}>
          <Pagination pagination={data.pagination} 
            hendleSetPage={hendleSetPage}
            />
          </li>
        }

        </ul> : 
        <>
          <p className={styles.length}>Вибачте, інформації не знайдено.</p>
          <p className={styles.length}>Додайте статтю.</p>
        </>
      }

      <AdminModal 
        isOpen={idArticle} 
        handleCallback={closeModal} 
        handleOkCallback={okRemove} 
        title={'Ви впевнені, що хочете видалити статтю?'} 
        btnBlok={true}>
      </AdminModal>
    </>
  )
}