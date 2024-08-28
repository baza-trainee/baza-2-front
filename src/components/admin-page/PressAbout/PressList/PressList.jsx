'use client';
import { useRouter } from '@/src/navigation';
import { createKey } from '@/src/lib/utils/createKey';
//import { ArticleCard } from '../../../shared/ArticleCard/ArticleCard';
import MainButton from '@/src/components/shared/MainButton/MainButton';
import { Icon } from '@/src/components/shared/Icon/Icon';
import styles from './PressList.module.scss';
import { useState } from 'react';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal'

import Pagination from '../../Pagination/Pagination';
import { ArticleCard } from './ArticleCard/ArticleCard';


export default function PressList({ 
  data,  
  hendleRemove, 
  hendleSetPage
}) {
  const router = useRouter();
  // console.log(data.results)
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
          return(
            <li key={createKey()} className={styles.item}>
              {/* Замінити на крточку */}
              <ArticleCard data={item}/>
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
        ( <>
            <p className={styles.length}>Вибачте, інформації не знайдено.</p>
            <p className={styles.length}>Змініть умови пошуку або додайте статтю.</p>
          </>
        )
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
