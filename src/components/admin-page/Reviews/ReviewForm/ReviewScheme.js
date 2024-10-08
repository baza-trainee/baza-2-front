import { z } from "zod";
import { patternName, patternText, patternRole, patternDateValue } from "@/src/constants/regulars";
import { ACCEPTED_IMAGE_TYPES } from "@/src/lib/hooks/checkFileType";
import { formatDateToNumericInputDate } from "@/src/lib/utils/formatData";
import { checkFileSize } from "@/src/lib/hooks/checkFileSize";
import { validateFileTypes } from "@/src/lib/hooks/validateFileTypes";
import { transformFileValue } from "@/src/lib/hooks/transformFileValue";
import { normalizeTextValue } from "@/src/lib/utils/normalizeTextValue";
import { minDateValue } from "@/src/lib/hooks/minMaxDate";
import { empryFile } from "@/src/lib/utils/empryFile";

export const ReviewDefaultValues = {
  file: null,
  name_ua: "",
  name_en: "",
  name_pl: "",
  text_ua: "",
  text_en: "",
  text_pl: "",
  role:"",
  date:""
}

// максимальний розмір файла 500КБ
const MAX_SIZE_IMG = 512000

// Базова схема
const Base = z.object({
  name_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(2, { message: 'Мінімум 2 символа' })
    .max(18, { message: 'Максимум 18 знаків' })
    .regex(patternName, { message: 'Присутні некоректні символи' }),

  name_en: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(2, { message: 'Мінімум 2 символа' })
    .max(18, { message: 'Максимум 18 знаків' })
    .regex(patternName, { message: 'Присутні некоректні символи' }),

  name_pl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(2, { message: 'Мінімум 2 символа' })
    .max(18, { message: 'Максимум 18 знаків' })
    .regex(patternName, { message: 'Присутні некоректні символи'}),

  text_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(50, { message: 'Мінімум 50 знаків'})
    .transform(normalizeTextValue)
    .pipe(z.string()
    .max(250, { message: 'Текст максимум 250 знаків'})
    .regex(patternText, { message: 'Присутні некоректні символи'})),

  text_en: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(50, { message: 'Мінімум 50 знаків' })
    .transform(normalizeTextValue)
    .pipe(z.string()
    .max(250, { message: 'Текст максимум 250 знаків' })
    .regex(patternText, { message: 'Присутні некоректні символи' })),

  text_pl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(50, { message: 'Мінімум 50 знаків' })
    .transform(normalizeTextValue)
    .pipe(z.string()
    .max(250, { message: 'Текст максимум 250 знаків' })
    .regex(patternText, { message: 'Присутні некоректні символи' })),

  role:z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(2, { message: 'Мінімум 2 символи' })
    .max(20, { message: 'Максимум 20 знаків' })
    .regex(patternRole, { message: 'Присутні некоректні символи' }),

  date:z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .regex(patternDateValue, { message: 'Введіть коректну дату' })
    .refine((value) => minDateValue(value),{ message: "Мінімальна дата 01-04-2023" })
    .transform((value) => formatDateToNumericInputDate({dateString:value})),
});

// Схема "Редагувати контент"
export const ReviewEditScheme = Base.extend({
  file: z.any()
    .refine((file) => checkFileSize(file, MAX_SIZE_IMG),"Max.розмір 500КБ")
    .refine((file) => validateFileTypes(file, ACCEPTED_IMAGE_TYPES),"Формат JPG, PNG, WEBP")
    .transform((value) => transformFileValue(value, ACCEPTED_IMAGE_TYPES)),   
})

// Схема "Додати контент"
export const ReviewAddScheme = Base.extend({
  file: z.any()
    .refine((file) => empryFile(file),"Це поле обов'язкове")
    .refine((file) => checkFileSize(file, MAX_SIZE_IMG),"Max.розмір 500КБ")
    .refine((file) => validateFileTypes(file, ACCEPTED_IMAGE_TYPES),"Формат JPG, PNG, WEBP")
    .transform((value) => transformFileValue(value, ACCEPTED_IMAGE_TYPES)),     
})