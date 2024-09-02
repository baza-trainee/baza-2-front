import styles from './CounterForm.module.scss';
import { useEffect } from 'react';
import { useRouter } from '@/src/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { counterDefaultValues, counterSchema } from './counterScheme';
import MainButton from '@/src/components/shared/MainButton/MainButton';
import InputField from '@/src/components/shared/inputs/InputField/InputField';

export default function CounterForm({defaultValues, hendleMutate}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({ 
    defaultValues: {...counterDefaultValues}, 
    resolver: zodResolver(counterSchema), 
    mode: 'onBlur'
  });

  const cancel = ()=>{
    router.replace('/admin')
    reset()
  }

  const onSubmit = (data) => {
   hendleMutate({employed:Number(data.employed)})
  };

  useEffect(()=>{
    if(defaultValues){
      reset()
      setValue('projects', defaultValues.projects ? (defaultValues.projects).toString() : '0');
      setValue('members', defaultValues.members ? (defaultValues.members).toString() : '0');
      setValue('employed', defaultValues.employed ? (defaultValues.employed).toString() : '0');
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
            disabled={true}
            className={styles.item}
            required={false}
            type='number'
            placeholder={"Введіть дані"}
            registerOptions={register("projects", { ...counterSchema.projects })}
            version={"input_admin"}
            label={'Активних проєктів'}
          />
        </li>
        <li>
          <InputField
            id={"members"}
            maxLength={20}
            disabled={true}
            className={styles.item}
            required={false}
            type='number'
            placeholder={"Введіть дані"}
            registerOptions={register("members", { ...counterSchema.members })}
            version={"input_admin"}
            label={'Залучених учасників'}
          />
        </li>
        <li>
          <InputField
            id={"employed"}
            className={styles.item}
            required={false}
            type='number'
            placeholder={"Введіть дані"}
            registerOptions={register("employed", { ...counterSchema.employed })}
            isError={errors.employed}
            isValid={isValid}
            version={"input_admin"}
            label={'Працевлаштовано'}
            iconName={"edit_black"}
          />
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
          onClick={cancel}
        >
          {'Скасувати'}
        </MainButton>

      </div >
    </form>
  )
}