'use client';

import styles from './PressAbout.module.scss';
import SectionAdmin from '../SectionAdmin/SectionAdmin';
import { Icon } from '../../shared/Icon/Icon';
import MainButton from '../../shared/MainButton/MainButton';
import { useRouter } from '@/src/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loader from '../../shared/loader/Loader';
import UseAlert from '../../shared/UseAlert/UseAlert';
import stateUseAlert from '@/src/state/stateUseAlert';
import { useState } from 'react';
import PressList from './PressList/PressList';
import {items} from '../../main-page/ArticlesSection/items';

export default function PressAbout() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
  const [search, setSearch] = useState("");
  const addPressPath = '/admin/press-about/add-press'

  const deletePress = useMutation({
    mutationFn:(id) => {
      return deletePressById(id)
    },onSuccess: () => {
      refetch()
    },onError:()=>{
      open('error', false)
    }})
  console.log(items);

  return(
    <SectionAdmin lang={true} title={"Пресса про нас"} hendleSearch={setSearch} defaultValue={search}>
          <MainButton  variant='admin' className={styles.btn} onClick={()=>{
            router.push(addPressPath)
          }}>
            <Icon name={'plus_icon'} width={24} height={24} />
            {'Додати статтю'}
          </MainButton >

          {items && <PressList items={items} hendleRemove={ deletePress.mutate }/>}

      <UseAlert/>
    </SectionAdmin>
  )
}