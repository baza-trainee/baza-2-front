import {
  patternEmail,
  patternEmailNonRu,
  patternLink,
  patternPhone,
} from "@/src/constants/regulars";
import { formatPhoneNumber } from "@/src/lib/utils/formatPhoneNumber";
import { z } from "zod";

export const contactsDefaultValues = {
  phone1: "",
  phone2: "",
  email: "",
  telegram: "",
  facebook: "",
  linkedin: "",
};

export const contactsScheme = z.object({
  phone1: z
    .string()
    .trim()
    .regex(patternPhone, { message: "incorrect_phone" })
    .transform((value) => formatPhoneNumber(value, true)),

  phone2: z
    .string()
    .trim()
    .regex(patternPhone, { message: "incorrect_phone" })
    .transform((value) => formatPhoneNumber(value, true)),

  email: z
    .string()
    .trim()
    .regex(patternEmail, { message: "incorrect_email" })
    .regex(patternEmailNonRu, { message: "invalid_ru" }),

  telegram: z
    .string()
    .trim()
    .regex(patternLink, { message: "Введіть дійсний URL" }),

  facebook: z
    .string()
    .trim()
    .regex(patternLink, { message: "Введіть дійсний URL" }),

  linkedin: z
    .string()
    .trim()
    .regex(patternLink, { message: "Введіть дійсний URL" }),
});
