import { z } from "zod";
import { patternDateValue, patternLink, patternText } from "@/src/constants/regulars";
import { ACCEPTED_IMAGE_TYPES } from "@/src/lib/hooks/checkFileType";
import { formatDateToNumericInputDate } from "@/src/lib/utils/formatData";
import { checkFileSize } from "@/src/lib/hooks/checkFileSize";
import { validateFileTypes } from "@/src/lib/hooks/validateFileTypes";
import { transformFileValue } from "@/src/lib/hooks/transformFileValue";
import { minDateValue } from "@/src/lib/hooks/minMaxDate";
import { normalizeTextValue } from "@/src/lib/utils/normalizeTextValue";
import { empryFile } from "@/src/lib/utils/empryFile";

export const pressDefaultValues = {
  file: null,
  title: "",
  description: "",
  link: '',
  date:""
}

// максимальний розмір файла 500КБ
const MAX_SIZE_IMG = 512000

// Базова схема
const Base = 	z.object({
  title: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове" })
    .min(5, { message: 'Мінімум 5 символа' })
    .max(50, { message: 'Максимум 50 символів' })
    .regex(patternText, { message: 'Присутні некоректні символи' }),

  description: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове" })
    .min(50, { message: 'Мінімум 50 символів' })
    .transform(normalizeTextValue)
    .pipe(z.string()
    .max(300, { message: 'Текст максимум 300 символів'})
    .regex(patternText, { message: 'Присутні некоректні символи'})),

  link: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .regex(patternLink, { message: 'Введіть дійсний URL'}),

  date:z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .regex(patternDateValue, { message: 'Введіть коректну дату' })
    .refine((value) => minDateValue(value),{ message: "Мінімальна дата 01-04-2023" })
    .transform((value) => formatDateToNumericInputDate({dateString:value})),
     
})
// Схема "Редагувати контент"
export const PressFormScheme = Base.extend({
  file: z.any()
    .refine((file) => checkFileSize(file, MAX_SIZE_IMG),"Max.розмір 500КБ")
    .refine((file) => validateFileTypes(file, ACCEPTED_IMAGE_TYPES),"Формат JPG, PNG, WEBP")
    .transform((value) => transformFileValue(value, ACCEPTED_IMAGE_TYPES)),   
})
// Схема "Додати контент"
export const PressAddFormScheme = Base.extend({
  file: z.any()
    .refine((file) => empryFile(file),"Це поле обов'язкове")
    .refine((file) => checkFileSize(file, MAX_SIZE_IMG),"Max.розмір 500КБ")
    .refine((file) => validateFileTypes(file, ACCEPTED_IMAGE_TYPES),"Формат JPG, PNG, WEBP")
    .transform((value) => transformFileValue(value, ACCEPTED_IMAGE_TYPES)),
})

//  Схема відправки на бекенд:{
// {
//   "title": "example",
//   "description": "Long text",
//   "link": string
//   "date": 888888444440,
//   "file": "image file (JPG, PNG, WEBP)"
// }