"use client";
import styles from "./ContactForm.module.scss";
import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl";
import MainButton from "../../shared/MainButton/MainButton";

export default function ContactForm() {
  const t = useTranslations("Main.feedback_form");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data)


  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <label>{t('name')} <span>*</span></label>
          <input {...register('firstName', { required: true, minLength:2, maxLength:30, pattern: /^[A-zіІїЇЄє']+$/i })} placeholder={t('name')}/>
          {/* {errors.firstName && <p>first name is required.</p>} */}
        </li>

        <li className={styles.item}>
          <label>{t('email')} <span>*</span></label>
          <input type="mail" {...register('email', { required: true, minLength:2, maxLength:30, pattern: /^[A-zіІїЇЄє']+$/i })} placeholder={'email@gmail.com'}/>
          {/* {errors.firstName && <p>first name is required.</p>} */}
        </li>    

        <li className={styles.item}>
          <label>{t('message')} <span>*</span></label>
          <textarea {...register('message', { required: true, minLength:2, maxLength:30})} placeholder={t('message_placeholder')} />
          {/* {errors.firstName && <p>first name is required.</p>} */}
        </li>  
      </ul>
      {/* <input {...register('lastName', { required: true })} />
      {errors.lastName && <p>Last name is required.</p>}
      <input {...register('age', { pattern: /\d+/ })} />
      {errors.age && <p>Please enter number for age.</p>} */}
      <MainButton type="submit" className={styles.submit}>{t("btn_send")}</MainButton>
    </form>
  )
}

// import { useForm } from "react-hook-form"


// export default function App() {
//   const { register, handleSubmit } = useForm()
//   const onSubmit = (data) => console.log(data)


//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("firstName", { required: true, maxLength: 20 })} />
//       <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
//       <input type="number" {...register("age", { min: 18, max: 99 })} />
//       <input type="submit" />
//     </form>
//   )
// }