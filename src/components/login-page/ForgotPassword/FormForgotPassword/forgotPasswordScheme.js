import { z } from "zod";
import { patternEmail } from "@/src/constants/regulars";

export const forgotPasswordDefaultValues= {
  email: "",
}

export const forgotPasswordSchema = z
	.object({
		email: z.string()
    .trim()
    .min(2, { message: 'Поле email не може бути порожнім' })
    .email({ message: 'Введіть дійсний email' })
    .regex(patternEmail, { message: 'Введіть дійсний email' })
    .refine(
      (value) => !/(.ru|.by)$/.test(value.split('@')[1]),
      {
        message: 'Домени .ru і .by не допускаються',
      }),
  })

 