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

const str= "За останні кілька років сфера розробки програмного забезпеченнязазнала революційних інновацій та трансформаційних змін. У міру того,як світовий ринок розробки програмного забезпечення наближається дооціночної оцінки в 507,2 мільярда доларів, трансформаційний впливнових тенденцій стає все більш очевидним. Розуміння та адаптаціяостанніх тенденцій розробки програмного забезпечення є стратегічноюнеобхідністю для компаній, які прагнуть підтримувати конкурентоспроможність та актуальність.Навіщо витрачати свій час на вивчення цих тенденцій? Переваги багатогранні. Бути в курсі останніх досягнень дозволяє вашому бізнесу використовувати найсучасніші технології, що призводить до підвищення операційної ефективності, покращення якості обслуговування клієнтів і явної ринкової переваги. Незалежно від того, чи є ви технічним директором, менеджером проектів або підприємцем, розуміння цих тенденцій має важливе значення для максимізації потенціалу ваших програмних проектів і залишатися в авангарді технологічного прогресу "