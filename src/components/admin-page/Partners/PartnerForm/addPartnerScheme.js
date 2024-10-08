import { z } from "zod";
import { patternLink, patternName } from "@/src/constants/regulars";
import { ACCEPTED_IMAGE_TYPES } from "@/src/lib/hooks/checkFileType";
import { checkFileSize } from "@/src/lib/hooks/checkFileSize";
import { validateFileTypes } from "@/src/lib/hooks/validateFileTypes";
import { transformFileValue } from "@/src/lib/hooks/transformFileValue";
import { empryFile } from "@/src/lib/utils/empryFile";

export const addPartnerDefaultValues= {
  name: "",
  homeUrl: "",
  file: null,
}

// максимальний розмір файла 500КБ
const MAX_SIZE_IMG = 512000

// Базова схема
const Base = z.object({
  name: z.string()
    .trim()
    .min(2, { message: 'Мінімум 2 символи' })
    .max(50, { message: 'Максимум 50 символів' })
    .regex(patternName, { message: 'Присутні некоректні символи' }),

  homeUrl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове" })
    .regex(patternLink, { message: 'Введіть дійсний URL' }),
});

// Схема "Редагувати контент"
export const PartnerEditScheme = Base.extend({
  file: z.any()
    .refine((file) => checkFileSize(file, MAX_SIZE_IMG),"Max.розмір 500КБ")
    .refine((file) => validateFileTypes(file, ACCEPTED_IMAGE_TYPES),"Формат JPG, PNG, WEBP")
    .transform((value) => transformFileValue(value, ACCEPTED_IMAGE_TYPES)),   
})

// Схема "Додати контент"
export const PartnerAddScheme = Base.extend({
  file: z.any()
    .refine((file) => empryFile(file),"Це поле обов'язкове")
    .refine((file) => checkFileSize(file, MAX_SIZE_IMG),"Max.розмір 500КБ")
    .refine((file) => validateFileTypes(file, ACCEPTED_IMAGE_TYPES),"Формат JPG, PNG, WEBP")
    .transform((value) => transformFileValue(value, ACCEPTED_IMAGE_TYPES)),     
})