import styles from './ProjectsList.module.scss'
import { useState } from 'react'
import { useRouter } from '@/src/navigation'
import { useParams } from 'next/navigation'
import { createKey } from '@/src/lib/utils/createKey'
import { createImageUrl } from '@/src/lib/hooks/createImageUrl'
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { Icon } from '@/src/components/shared/Icon/Icon'
import AdminModal from '@/src/components/modals/AdminModal/AdminModal'
import ProjectCard from '@/src/components/projects-page/ProjectCard/ProjectCard'
import Pagination from '../../Pagination/Pagination'
import MessageErrorLoading from '@/src/components/shared/MessageErrorLoading/MessageErrorLoading'

export default function PartnerList({data, hendleRemove, hendleSetPage}) {
  const router = useRouter();
  // Мова сторінки.
  const { locale } = useParams();
  const[ idPartner, setIdPartner ] = useState(null)

  const editProjectPath = '/admin/projects/edit'

  const closeModal=()=>{
    setIdPartner(null)
  }

  const okRemove=()=>{
    hendleRemove(idPartner)
    setIdPartner(null)
  }
  
  return ( <>
    {data?.results.length ? <ul className={styles.list}>
      {data?.results.map((el)=>{
        return <li key={createKey()} className={styles.item}>
          <ProjectCard 
            project={el}
            coverImgUrl={createImageUrl(el.imageUrl)} locale={locale}/>
          <div className={styles.btns}>
            <MainButton variant='admin' 
              className={styles.btn} 
              onClick={()=>{router.push(`${editProjectPath}/${el._id}`)}}>
              <Icon  width={24} height={24} name='edit'/>
            </MainButton>

            <MainButton variant='admin' onClick={()=>{setIdPartner(el._id)}} className={styles.btn}>
              <Icon width={24} height={24} name='remove'/>
            </MainButton>
          </div>
        </li>
      })}

      {data.pagination.totalPages > 1 && <li className={styles.pagination}>
        <Pagination pagination={data.pagination} 
          hendleSetPage={hendleSetPage}/>
        </li>
      }
    </ul> : 
    <MessageErrorLoading variant='search'/> 
    }

    <AdminModal 
      isOpen={idPartner} 
      handleCallback={closeModal} 
      handleOkCallback={okRemove} 
      title={'Ви впевнені, що хочете видалити проєкт?'} 
      btnBlok={true}>
    </AdminModal>
  </>
  )
}