import {
  patternEmail,
  patternEmailNonRu,
  patternFacebook,
  patternLink,
  patternPhone,
  patternUrlLinkedin,
  patterTelegram,
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

export const ContactsScheme = z.object({
  phone1: z
    .string()
    .trim()
    .regex(patternPhone, { message: "Введіть дійсний номер" })
    .transform((value) => formatPhoneNumber(value, true)),
  phone2: z
    .string()
    .trim()
    .regex(patternPhone, { message: "Введіть дійсний номер" })
    .transform((value) => formatPhoneNumber(value, true)),
  email: z
    .string()
    .trim()
    .regex(patternEmail, { message: "Введіть дійсний Email" })
    .regex(patternEmailNonRu, { message: "Домени .ru і .by не допускаються" }),
  telegram: z
    .string()
    .trim()
    .regex(patterTelegram, { message: "Введіть дійсний URL" }),
  facebook: z
    .string()
    .trim()
    .regex(patternFacebook, { message: "Введіть дійсний URL" }),
  linkedin: z
    .string()
    .trim()
    .regex(patternUrlLinkedin, { message: "Введіть дійсний URL" }),
});
