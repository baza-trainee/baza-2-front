'use client';
import switchTabProject from '@/src/state/switchTabProject';
import EditDescription from '../Description/EditDescription';
import SectionAdmin from '../../SectionAdmin/SectionAdmin';

export default function EditProjectLayout() {
  const tabName = switchTabProject(state => state.tabName);

 return( 
    <SectionAdmin title={'Редагувати проєкт'} nav={true}>
      {tabName=='description'&& <EditDescription/>}
      {tabName=='team'&& <p>team</p>}
    </SectionAdmin>
  )
}