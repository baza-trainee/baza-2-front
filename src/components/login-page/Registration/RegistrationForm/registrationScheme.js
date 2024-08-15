import { z } from "zod";
import { patternEmail, patternPassword,  } from "@/src/constants/regulars";

export const registrationDefaultValues= {
  email: "",
  password:"",
  confirmPassword:''
}

export const registrationSchema = z
	.object({
		email: z.string()
    .trim()
    .min(1, { message: 'Поле email не може бути порожнім' })
    .email({ message: 'Введіть дійсний email' })
    .regex(patternEmail, { message: 'Введіть дійсний email' })
    .refine(
      (value) => value.split('@')[0].length > 1,
      {
        message: 'Введіть дійсний email',
      })
    .refine(
      (value) => !/(.ru|.by)$/.test(value.split('@')[1]),
      {
        message: 'Домени .ru і .by не допускаються',
      }),

    password: z.string()
    .trim()
    .min(1, { message: 'Поле пароль не може бути порожнім' })
    .min(8, { message: 'Пароль має містити мінімум 8 символів' })
    .max(14, {message: 'Пароль має містити максимум 14 символів'})
    .regex(patternPassword, { message: 'Введіть коректний пароль' }),

    confirmPassword: z.string()
      .trim()
      .min(1, { message: 'Підтвердіть пароль' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не збігаються. Спробуйте ще раз.',
    path: ['confirmPassword'],
  })
 