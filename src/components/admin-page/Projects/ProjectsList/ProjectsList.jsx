import styles from './ProjectsList.module.scss'
import { useState } from 'react'
import { useRouter } from '@/src/navigation'
import { createKey } from '@/src/lib/utils/createKey'
import { createImageUrlBaza1 } from '@/src/lib/hooks/createImageUrl'
//import PartnerCard from '@/src/components/shared/PartnerCard/PartnerCard'
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { Icon } from '@/src/components/shared/Icon/Icon'


import AdminModal from '@/src/components/modals/AdminModal/AdminModal'
import ProjectCard from '@/src/components/projects-page/ProjectCard/ProjectCard'


export default function PartnerList({data, hendleRemove}) {
  const router = useRouter();
  const[ idPartner, setIdPartner ] = useState(null)

  const closeModal=()=>{
    setIdPartner(null)
  }

  const okRemove=()=>{
    hendleRemove(idPartner)
    setIdPartner(null)
  }
  
  return ( <>
    {data?.length ? <ul className={styles.list}>
      {data.map((el)=>{
        return <li key={createKey()} className={styles.item}>
          <ProjectCard   
            project={el}
            coverImgUrl={createImageUrlBaza1(el.imageUrl)} />
          <div className={styles.btns}>
            <MainButton variant='admin' 
              className={styles.btn} 
              onClick={()=>{router.push(`/admin/projects/edit-project/${el._id}`)}}>
              <Icon  width={24} height={24} name='edit'/>
            </MainButton>

            <MainButton variant='admin' onClick={()=>{setIdPartner(el._id)}} className={styles.btn}>
              <Icon width={24} height={24} name='remove'/>
            </MainButton>
          </div>
        </li>
      })}
    </ul> : 
    <>
      <p className={styles.length}>Вибачте, інформації не знайдено.</p>
      <p className={styles.length}>Додайте партнера або уточніть запит.</p>
    </>
    }

    <AdminModal isOpen={idPartner} handleCallback={closeModal} handleOkCallback={okRemove} title={'Ви впевнені, що хочете видалити партнера?'} btnBlok={true}></AdminModal>
  </>
  )
}