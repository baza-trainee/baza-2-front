import { z } from "zod";
import { patternEmail, patternEmailNonRu, patternPassword,  } from "@/src/constants/regulars";

export const registrationDefaultValues= {
  email: "",
  password:"",
  confirmPassword:''
}

export const registrationSchema = z
	.object({
		email: z.string()
    .trim()
    .min(2, { message: 'Поле email не може бути порожнім' })
    .email({ message: 'Введіть дійсний email' })
    .regex(patternEmail, { message: 'Введіть дійсний email' })
    .regex(patternEmailNonRu, { message: 'Домени .ru і .by не допускаються' }),

    password: z.string()
    .trim()
    .min(1, { message: 'Поле пароль не може бути порожнім' })
    .min(8, { message: 'Пароль має містити мінімум 8 символів' })
    .max(14, {message: 'Пароль має містити максимум 14 символів'})
    .regex(patternPassword, { message: 'Пароль має складатись з 6 символів і  містити цифри та латинські літери' }),

    confirmPassword: z.string()
      .trim()
      .min(1, { message: 'Поле пароль не може бути порожнім' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не збігаються.Спробуйте ще раз.',
     path: ['confirmPassword'],
  })
 