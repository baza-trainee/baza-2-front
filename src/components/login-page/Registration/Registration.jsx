import { Link } from '@/src/navigation';
import InputField from '../../shared/InputField/InputField';
import Loader from '../../shared/loader/Loader';
import MainButton from '../../shared/MainButton/MainButton';
import styles from './Registration.module.scss';
import { Icon } from '../../shared/Icon/Icon';

export default function Registration() {

  return (
  <section className={styles.section}>
    <form className={styles.form}>
      <div className={styles.title}>
        <h2>Реєстрація</h2>
        <p>Зареєструйтесь в системі</p>
      </div>
      <ul className={styles.list}>
      <li>
          <InputField
            id={"email"}
            maxLength={55}
            className={styles.item}
            //type='email'
            placeholder={"Електронна пошта"}
            //registerOptions={register("email", { ...MentorSchema.email })}
            //isError={errors.email}
            //isValid={isValid}
            version={"input"}
            label={'Електронна пошта'}
          />
          {/* {errors.email && <p className={styles.error_modal}>{t(`error_message.${errors.email.message}`)}</p>} */}
        </li>
        <li className={styles.list_item} >
          <InputField
            id={"password"}
            maxLength={55}
            className={styles.item}
            type='Password'
            placeholder={"Пароль"}
            //registerOptions={register("email", { ...MentorSchema.email })}
            //isError={errors.email}
            //isValid={isValid}
            version={"input"}
            label={'Пароль'}
          />
          <button type='button' className={styles.btn}>
            <Icon width={24} height={24} name={'closed_eye'}/>
          </button>
          {/* {errors.email && <p className={styles.error_modal}>{t(`error_message.${errors.email.message}`)}</p>} */}
        </li>
        <li className={styles.list_item}>
          <InputField
            id={"confirm_password"}
            //required={false}
            maxLength={55}
            className={styles.item}
            type='Password'
            placeholder={"Пароль"}
            //registerOptions={register("email", { ...MentorSchema.email })}
            //isError={errors.email}
            //isValid={isValid}
            version={"input"}
            label={'Підтвердіть пароль'}
          />
          <button type='button' className={styles.btn}>
          <Icon width={24} height={24} name={'open_eye'}/>
          </button>
         
          {/* {errors.email && <p className={styles.error_modal}>{t(`error_message.${errors.email.message}`)}</p>} */}
        </li>


      </ul>
      <MainButton
        type="submit"
        //disabled={isDisabled()}
        //disabled={!isDirty || !isValid}
        className={styles.submit}
        //variant={"modal"}
      >
        {'Зареєструватись'}
      </MainButton>

      <p>Ви маєте акаунт? <Link href={'/login'}>Авторизуватись</Link></p>
      {/* {loader && <Loader/>} */}


    </form>
  </section>
  )
}