import { z } from "zod";
import { patternPassword } from "@/src/constants/regulars";

export const changePasswordDefaultValues= {
  oldPassword: "",
  newPassword:"",
  confirmPassword:''
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
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Паролі не збігаються. Спробуйте ще раз.',
    path: ['confirmPassword'],
  })