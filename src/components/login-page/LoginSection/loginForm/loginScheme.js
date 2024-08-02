import { z } from "zod";

export const loginDefaultValues= {
  email: "",
  password:"",
}

export const loginSchema = z
	.object({
		email: z.string()
    .trim()
    .min(1, { message: 'Поле логін не може бути порожнім' }),

    password: z.string()
    .trim()
    .min(1, { message: 'Поле пароль не може бути порожнім' }),
  })

 