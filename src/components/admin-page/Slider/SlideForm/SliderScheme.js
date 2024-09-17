import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES } from "@/src/lib/hooks/checkFileType";
import { patternText } from "@/src/constants/regulars";
import { checkFileSize } from "@/src/lib/hooks/checkFileSize";
import { validateFileTypes } from "@/src/lib/hooks/validateFileTypes";
import { transformFileValue } from "@/src/lib/hooks/transformFileValue";
import { normalizeTextValue } from "@/src/lib/utils/normalizeTextValue";

export const SliderDefaultValues= {
  file: null,
  title_ua: "",
  title_en: "",
  title_pl: "",
  text_ua: "",
  text_en: "",
  text_pl: "",
}
// максимальний розмір файла 1MB
const MAX_SIZE_IMG = 1048576

export const SliderScheme = z
	.object({
    file: z.any()
    .refine((file) => checkFileSize(file, MAX_SIZE_IMG),"Max.розмір 1MB")
    .refine((file) => validateFileTypes(file, ACCEPTED_IMAGE_TYPES),"Формат JPG, PNG, WEBP")
    .transform((value) => transformFileValue(value, ACCEPTED_IMAGE_TYPES)),

		title_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове" })
    .min(5, { message: 'Заголовок мінімум 5 знаків' })
    .max(40, { message: 'Заголовок максимум 40 знаків' })
    .regex(patternText, { message: 'Присутні некоректні символи' }),

		title_en: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове" })
    .min(5, { message: 'Заголовок мінімум 5 знаків'})
    .max(40, { message: 'Заголовок максимум 40 знаків' })
    .regex(patternText, { message: 'Присутні некоректні символи' }),

		title_pl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове" })
    .min(5, { message: 'Заголовок мінімум 5 знаків' })
    .max(40, { message: 'Заголовок максимум 40 знаків' })
    .regex(patternText, { message: 'Присутні некоректні символи' }),

    text_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Текст мінімум 5 знаків'})
    .transform(normalizeTextValue)
    .pipe(z.string().max(360, { message: 'Текст максимум 360 знаків' }).regex(patternText, { message: 'Присутні некоректні символи' })),
 
    text_en: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Текст мінімум 5 знаків' }) 
    .transform(normalizeTextValue)
    .pipe(z.string().max(360, { message: 'Текст максимум 360 знаків' }).regex(patternText, { message: 'Присутні некоректні символи' })),

    text_pl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове" })
    .min(5, { message: 'Текст мінімум 5 знаків' })
    .transform(normalizeTextValue)
    .pipe(z.string().max(360, { message: 'Текст максимум 360 знаків' }).regex(patternText, { message: 'Присутні некоректні символи' })),

})

// Схема відправки на бекенд:{
//   "title": {
//     "en": "string",
//     "pl": "string",
//     "ua": "string"
//   },
//   "subtitle": {
//     "en": "string",
//     "pl": "string",
//     "ua": "string"
//   },
//   "file": "image file (JPG, PNG, WEBP)"
// }