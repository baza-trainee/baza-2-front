import { z } from "zod";
import { patternEmail, patternEmailNonRu, patternNikDiscord,  } from "@/src/constants/regulars";

export const registrationDefaultValues= {
  email: "",
  password:""
}

export const registrationSchema = z
	.object({
		email: z.string()
    .trim()
    .min(2, { message: 'Введіть електронну пошту' })
    .email({ message: 'incorrect_email' })
    .regex(patternEmail, { message: 'incorrect_email' })
    .regex(patternEmailNonRu, { message: 'invalid_ru' }),

    password: z.string()
    .trim()
    .min(1, { message: 'password' })
    .regex(patternNikDiscord, { message: 'incorrect_password' }),
	});