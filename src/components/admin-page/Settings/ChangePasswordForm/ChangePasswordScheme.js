import { z } from "zod";
import { patternPassword } from "@/src/constants/regulars";

export const changePasswordDefaultValues= {
  oldPassword: "",
  newPassword:"",
  confirmPassword:''
}

const validatePassword=(str,value)=>{
  const myExp = new RegExp(str);
  return myExp.test(value)
}

export const changePasswordScheme = z
	.object({
    oldPassword: z.string()
    .trim()
    .min(1, { message: 'Поле пароль не може бути порожнім' }),

    newPassword: z.string()
    .trim()
    .min(1, { message: 'Поле пароль не може бути порожнім' })
    .min(8, { message: 'Пароль має містити мінімум 8 символів' })
    .max(14, {message: 'Пароль має містити максимум 14 символів'})
    .regex(patternPassword, { message: 'Введіть коректний пароль' }),

    confirmPassword: z.string()
    .trim()
    .min(1, { message: 'Підтвердіть пароль' })
  }) 
  .refine((data) => validatePassword(data.newPassword, data.confirmPassword), {
    message: 'Паролі не збігаються. Спробуйте ще раз.',
    path: ['confirmPassword'],
  })
  // .refine((data) => !validatePassword(data.oldPassword, data.newPassword), {
  //   message: 'Паролі не збігаються. Спробуйте ще раз.',
  //   path: ['newPassword'],
  // })
  // .refine((data) => data.newPassword === data.confirmPassword, {
  //   message: 'Паролі не збігаються. Спробуйте ще раз.',
  //   path: ['confirmPassword'],
  // })