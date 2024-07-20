"use client";

import { useRouter } from '@/src/navigation';
import UseAlert from '../../shared/UseAlert/UseAlert';
import Section from '../Section/Section';
import FormRecoverPassword from './FormRecoverPassword/FormRecoverPassword';

export default function RecoverPassword() {
  //const open = stateUseAlert(state => state.open);
  const router = useRouter();

  const onSubmit = (data) => {
    console.log(data)
    router.replace('/admin');
  };

  return (
    <Section title={'Відновити пароль'} text={'Створіть новий пароль'}>
      <FormRecoverPassword handleMutate={onSubmit} isSuccess={true}/>
       {/* {isPending && <Loader/>}  */}
       <UseAlert/>
    </Section>
  )
}