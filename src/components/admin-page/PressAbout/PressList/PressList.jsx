import { useRouter } from '@/src/navigation';
import { createKey } from '@/src/lib/utils/createKey';
import { ArticleCard } from '../../../shared/ArticleCard/ArticleCard';
import MainButton from '@/src/components/shared/MainButton/MainButton';
import { Icon } from '@/src/components/shared/Icon/Icon';
import styles from './PressList.module.scss';
import { useState } from 'react';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal'


export default function PressList({ items = [] }) {
  const router = useRouter();
  
  // Шляхи сторінок
  const editPressPath = '/admin/press/edit-press';
  const [idPress, setIdPress] = useState(null);

  const closeModal = () => {
    setIdPress(null);
  };

  const okRemove = () => {
    handleRemove(idPress);
    setIdPress(null);
  };

  return ( 
    <>
    <div className={styles.list}>
      {items.map((item) => {
        return(
          <li key={createKey()} className={styles.item}>
          <ArticleCard item={item} className={styles.card} />
          <div className={styles.btns}>
            <MainButton 
              variant='admin'
              className={styles.btn} 
              onClick={() => router.push(`${editPressPath}/${item.id}`)}
              >
              <Icon width={24} height={24} name='edit' />
            </MainButton>
            <MainButton 
              variant='admin'  
              className={styles.btn}
              onClick={() => setIdPress(item.id)}
              >
              <Icon width={24} height={24} name='remove' />
            </MainButton>
          </div>
        </li>
        )
      })}
    </div>
    <AdminModal isOpen={idPress} handleCallback={closeModal} handleOkCallback={okRemove} title={'Ви впевнені, що хочете видалити відгук?'} btnBlok={true}></AdminModal>

   </>
  );
}
