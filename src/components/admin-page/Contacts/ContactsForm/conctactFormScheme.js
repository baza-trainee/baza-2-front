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

export const ContactsScheme = z.object({
  phone1: z
    .string()
    .trim()
    .transform((value) => Number(formatPhoneNumber(value, true))),
  phone2: z
    .string()
    .trim()
    .transform((value) => Number(formatPhoneNumber(value, true))),
  email: z.string().trim(),
  telegram: z.string().trim(),
  facebook: z.string().trim(),
  linkedin: z.string().trim(),
});
