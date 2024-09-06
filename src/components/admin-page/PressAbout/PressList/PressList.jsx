'use client';
import styles from './PressList.module.scss';
import { useState } from 'react';
import { useRouter } from '@/src/navigation';
import { createKey } from '@/src/lib/utils/createKey';
import { ArticleCard } from '../../../shared/ArticleCard/ArticleCard';
import MainButton from '@/src/components/shared/MainButton/MainButton';
import { Icon } from '@/src/components/shared/Icon/Icon';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal'
import Pagination from '../../Pagination/Pagination';
import MessageErrorLoading from '@/src/components/shared/MessageErrorLoading/MessageErrorLoading';

export default function PressList({ 
  data,  
  hendleRemove, 
  hendleSetPage
}) {
  const router = useRouter();
  // Шляхи сторінок
  const editPressPath = '/admin/press-about/edit';
  const [idPress, setIdPress] = useState(null);

  const closeModal = () => {
    setIdPress(null);
  };

  const okRemove = () => {
    hendleRemove(idPress);
    setIdPress(null);
  };

  return ( 
    <>
     {data?.results?.length ? <ul className={styles.list}>
        {data?.results && data.results.map((item) => {
          console.log(item)
          return(
            <li key={createKey()} className={styles.item}>
              <ArticleCard item={item}/>
              <div className={styles.btns}>
                <MainButton 
                  variant='admin'
                  className={styles.btn} 
                  onClick={() => router.push(`${editPressPath}/${item._id}`)}
                  >
                  <Icon width={24} height={24} name='edit' />
                </MainButton>
                <MainButton 
                  variant='admin'  
                  className={styles.btn}
                  onClick={() => setIdPress(item._id)}
                  >
                  <Icon width={24} height={24} name='remove' />
                </MainButton>
              </div>
            </li>
          )
          })
        }
        </ul>: 
        <MessageErrorLoading variant='search'/>
      }

    {data?.pagination.totalPages > 1 && <div className={styles.pagination}>
      <Pagination pagination={data.pagination} 
        hendleSetPage={hendleSetPage}
        />
      </div>
    }

    <AdminModal 
      isOpen={idPress} 
      handleCallback={closeModal} 
      handleOkCallback={okRemove} 
      title={'Ви впевнені, що хочете видалити статтю?'} 
      btnBlok={true}>
    </AdminModal>
   </>
  );
}
