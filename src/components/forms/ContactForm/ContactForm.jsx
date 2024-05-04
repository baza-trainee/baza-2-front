"use client";
import styles from "./ContactForm.module.scss";
import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl";
import MainButton from "../../shared/MainButton/MainButton";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data)


  const t = useTranslations("Main.feedback_form");
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>name</label>
        <input type="text"/>
      </div>
      <input {...register('firstName')} />
      <input {...register('lastName', { required: true })} />
      {errors.lastName && <p>Last name is required.</p>}
      <input {...register('age', { pattern: /\d+/ })} />
      {errors.age && <p>Please enter number for age.</p>}
      <MainButton type="submit">{t("btn_send")}</MainButton>
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