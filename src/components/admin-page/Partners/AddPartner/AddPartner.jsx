'use client';
import styles from './AddPartner.module.scss'
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addPartnerDefaultValues, addPartnerSchema } from './addPartnerScheme';
import { useRouter } from '@/src/navigation';
import { useMutation } from '@tanstack/react-query';
import { createNewPartner } from '@/src/api/partners';
import InputField from '@/src/components/shared/InputField/InputField';
import SectionAdmin from '../../SectionAdmin/SectionAdmin'
import { Icon } from '@/src/components/shared/Icon/Icon';
import MainButton from '@/src/components/shared/MainButton/MainButton';
import stateUseAlert from '@/src/state/stateUseAlert';
import UseAlert from '@/src/components/shared/UseAlert/UseAlert';
import Loader from '@/src/components/shared/loader/Loader';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';

export default function AddPartner() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setmodalOpen ] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({ defaultValues: {...addPartnerDefaultValues}, resolver: zodResolver(addPartnerSchema), mode: 'onChange'});

  const closeModal = useCallback(()=>{
    reset()
    setmodalOpen(false)
    router.replace('/admin/partners')
  })

  const resetForm = () => {
    reset();
    router.replace('/admin/partners')
  }

  const { mutate, isPending } = useMutation({
    mutationFn:(data) => {
      return createNewPartner(data)

    },onSuccess: () => {
      setmodalOpen(true)
    },onError:()=>{
      open('error', false)
    }})

  const onSubmit = (data) => {
    const newData = {
      name: data.name,
      homeUrl: data.homeUrl,
      file: data.imageUrl[0],
    }
    mutate(newData)
  };

  const isDisabled = () => {
    if (Object.keys(errors).length > 0) {
      return true;
    } else 
    if (!isDirty) {
      return true;
    } else if(!isValid){
      return true
    }else return false
  }

  return (
    <SectionAdmin title={'Додати партнерів'}>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <ul className={styles.list}>
          <li className={styles.list_item}>
            <InputField
              id={"name"}
              maxLength={55}
              className={styles.item}
              required={false}
              placeholder={"Назва"}
              registerOptions={register("name", { ...addPartnerSchema.name })}
              isError={errors.name}
              isValid={isValid}
              version={"input"}
              label={'Назва'}
            />
            {errors.name && <p className={styles.error_modal}>{errors.name.message}</p>}
          </li>
          <li className={styles.list_item}>
            <InputField
              id={"imageUrl"}
              maxLength={55}
              className={styles.item}
              type={'file'}
              required={false}
              accept="image/*"
              //placeholder={"Логотип"}
              registerOptions={register("imageUrl", { ...addPartnerSchema.imageUrl })}
              isError={errors.imageUrl}
              isValid={isValid}
              version={"input"}
              label={'Логотип'}
            />
            <Icon className={styles.edit_black} width={24} height={24} name='download'/>
            {errors.imageUrl && <p className={styles.error_modal}>{errors.imageUrl.message}</p>}
          </li>

          <li className={styles.list_item}>
            <InputField
              id={"homeUrl"}
              maxLength={55}
              className={styles.item}
              required={false}
              placeholder={"Посилання на сайт"}
              registerOptions={register("homeUrl", { ...addPartnerSchema.homeUrl })}
              isError={errors.homeUrl}
              isValid={isValid}
              version={"input"}
              label={'Посилання на сайт'}
            />
            {errors.homeUrl && <p className={styles.error_modal}>{errors.homeUrl.message}</p>}
          </li>
        </ul>

        <div className={styles.btns}>
          <MainButton
            type="submit"
            className={styles.btn}
            disabled={isDisabled()}
          >
            {'Додати'}
          </MainButton>

          <MainButton
            variant='admin'
            className={styles.btn_cancel}
            onClick={()=>{resetForm()}}
          >
            {'Скасувати'}
          </MainButton>
        </div >
      </form>

      { isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Партнера успішно додано'} btn={true}></AdminModal>
      <UseAlert/>

    </SectionAdmin>
  )
}