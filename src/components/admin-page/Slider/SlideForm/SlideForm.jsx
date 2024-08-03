'use client';
import styles from './SlideForm.module.scss'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/src/components/shared/InputField/InputField'
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { useRouter } from '@/src/navigation';
import InputFile from '@/src/components/shared/inputs/InputFile/InputFile';
import { SliderDefaultValues, SliderScheme } from './SliderScheme';
import { Icon } from '@/src/components/shared/Icon/Icon';
import SlidePreview from '../SlidePreview/SlidePreview';

export default function SlideForm({hendleMutate, isSuccess, handlePrevImg, data,submitBtnText= 'Зберегти зміни'}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    setValue,
    getValues,
  } = useForm({ defaultValues: {...SliderDefaultValues}, resolver: zodResolver(SliderScheme), mode: 'onChange'});

  const resetForm = () => {
    router.replace('/admin/slider')
    reset();
  }

  useEffect(()=>{
    if(isSuccess){
      reset();
    }
  },[isSuccess])

  useEffect(()=>{
    if(data){
      const{name, imageUrl, homeUrl} = data
      setValue('name', name)
      setValue('homeUrl', homeUrl)
      setValue('imageUrl', '')
      handlePrevImg(imageUrl)
    }
  },[data])

  const onSubmit = (data) => {
    const newData = {
      name: data.name,
      homeUrl: data.homeUrl,
      file: data.imageUrl[0],
    }
    hendleMutate(newData)
  };
    
  const isDisabled = () => {
    console.log(getValues('imageUrl'))
    if (Object.keys(errors).length > 0) {
      return true;
    } else 
    if (!isDirty) {
      return true;
    } 
    else if(!isValid){
      return true
    }
    else return false
  }

  return(
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ul className={styles.list}>
        {/* <li className={styles.list_item}>
          <InputField
            id={"name"}
            maxLength={55}
            className={styles.item}
            required={false}
            placeholder={"Назва"}
            registerOptions={register("name", { ...SliderScheme.name })}
            isError={errors.name}
            isValid={isValid}
            version={"input_admin"}
            label={'Назва'}
          />
        </li> */}
        <li>
          <ul className={styles.list_items}>
            <li>
              <InputFile
                id={"imageUrl"}
                className={styles.item}
                type={'file'}
                getPrevImgUrl={ handlePrevImg }
                required={false}
                accept="image/*"
                placeholder={"Завантажте зображення"}
                registerOptions={register("imageUrl", { ...SliderScheme.imageUrl })}
                isDirty={isDirty}
                isError={errors.imageUrl}
                isValid={isValid}
                version={"file"}
                label={'Зображення'}
              />
            </li>
            <li>
              <SlidePreview/>
            </li>
          </ul>
        </li>
        <li>
          <ul className={styles.list_items}>
            <li className={styles.list_item}>
              <InputField
                id={"name"}
                maxLength={55}
                className={styles.item}
                required={false}
                placeholder={"Заголовок"}
                registerOptions={register("name", { ...SliderScheme.name })}
                isError={errors.name}
                isValid={isValid}
                version={"input_admin"}
                label={'Заголовок'}
                locale={'ua'}
              />
            </li>
            <li className={styles.list_item}>
              <InputField
                id={"name"}
                maxLength={55}
                className={styles.item}
                required={false}
                placeholder={"Заголовок"}
                registerOptions={register("name", { ...SliderScheme.name })}
                isError={errors.name}
                isValid={isValid}
                version={"input_admin"}
                locale={'en'}
              />
            </li> 

            <li className={styles.list_item}>
              <InputField
                id={"name"}
                maxLength={55}
                className={styles.item}
                required={false}
                placeholder={"Заголовок"}
                registerOptions={register("name", { ...SliderScheme.name })}
                isError={errors.name}
                isValid={isValid}
                version={"input_admin"}
                locale={'pl'}
              />
            </li> 
          </ul>
        </li>

      </ul>

      <div className={styles.btns}>
        <MainButton
          type="submit"
          className={styles.btn}
          disabled={isDisabled()}
        >
          {submitBtnText}
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
  )
}