import {
  patternEmail,
  patternEmailNonRu,
  patternLink,
  patternPhone,
} from "@/src/constants/regulars";
import { z } from "zod";

export const ContactsScheme = z.object({
  phone: z
    .string()
    .trim()
    .regex(patternPhone, { message: "incorrect_phone" })
    .transform((value) => formatPhoneNumber(value, true)),

  email: z
    .string()
    .trim()
    .regex(patternEmail, { message: "incorrect_email" })
    .regex(patternEmailNonRu, { message: "invalid_ru" }),

  validUrl: z
    .string()
    .trim()
    .regex(patternLink, { message: "Введіть дійсний URL" }),
});
