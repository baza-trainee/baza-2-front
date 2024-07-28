import styles from './CounterForm.module.scss';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { counterDefaultValues, counterSchema } from './counterScheme';
import MainButton from '@/src/components/shared/MainButton/MainButton';
import InputField from '@/src/components/shared/InputField/InputField';

export default function CounterForm({defaultValues, hendleMutate}) {

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({ defaultValues: {...counterDefaultValues}, resolver: zodResolver(counterSchema), mode: 'onBlur'});

  const onSubmit = (data) => {
   hendleMutate({employed:Number(data.employed)})
  };

  useEffect(()=>{
    if(defaultValues){
      reset()
      setValue('projects', defaultValues.projects ? (defaultValues.projects).toString() : '');
      setValue('members', defaultValues.members ? (defaultValues.members).toString() : '');
      setValue('employed', defaultValues.employed ? (defaultValues.employed).toString() : '');
    }
  },[defaultValues])

  const isDisabled = () => {
    if (Object.keys(errors).length > 0) {
      return true;
    } else 
    if (!isDirty) {
      return true;
    } else if(!isValid){
      return true
    }else return false
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ul className={styles.list}>
        <li>
        <InputField
            id={"projects"}
            maxLength={20}
            className={styles.item}
            required={false}
            type='number'
            placeholder={"Введіть дані"}
            registerOptions={register("projects", { ...counterSchema.projects })}
            isError={errors.projects}
            isValid={isValid}
            version={"input"}
            label={'Активних проєктів'}
          />

          {errors.projects && <p className={styles.error_modal}>{errors.projects.message}</p>}
        </li>
        <li>
        <InputField
            id={"members"}
            maxLength={20}
            className={styles.item}
            required={false}
            type='number'
            placeholder={"Введіть дані"}
            registerOptions={register("members", { ...counterSchema.members })}
            isError={errors.members}
            isValid={isValid}
            version={"input"}
            label={'Залучених учасників'}
          />

          {errors.members && <p className={styles.error_modal}>{errors.members.message}</p>}
        </li>
        <li>
          <InputField
            id={"employed"}
            maxLength={20}
            className={styles.item}
            required={false}
            type='number'
            placeholder={"Введіть дані"}
            registerOptions={register("employed", { ...counterSchema.employed })}
            isError={errors.employed}
            isValid={isValid}
            version={"input"}
            label={'Працевлаштовано'}
          />

          {errors.employed && <p className={styles.error_modal}>{errors.employed.message}</p>}
        </li>
      </ul>
      <div className={styles.btns}>
        <MainButton
          type="submit"
          disabled={isDisabled()}
        >
          {'Зберегти зміни'}
        </MainButton>

        <MainButton
          variant='admin'
          className={styles.btn_cancel}
          onClick={()=>{reset()}}
        >
          {'Скасувати'}
        </MainButton>

      </div >
    </form>
  )
}