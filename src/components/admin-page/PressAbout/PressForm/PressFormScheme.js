import { z } from "zod";
import { patternDateValue, patternText, patternUrlLinkedin } from "@/src/constants/regulars";
import { ACCEPTED_IMAGE_TYPES } from "@/src/lib/hooks/checkFileType";
import { formatDateToNumericInputDate } from "@/src/lib/utils/formatData";
import { checkFileSize } from "@/src/lib/hooks/checkFileSize";
import { validateFileTypes } from "@/src/lib/hooks/validateFileTypes";
import { transformFileValue } from "@/src/lib/hooks/transformFileValue";
import { minDateValue } from "@/src/lib/hooks/minMaxDate";
import { normalizeTextValue } from "@/src/lib/utils/normalizeTextValue";

export const pressDefaultValues = {
  file: null,
  title: "",
  description: "",
  link: '',
  date:""
}

// максимальний розмір файла 500КБ
const MAX_SIZE_IMG = 512000

// Перетворюємо рядок на масив рядків
const strToArr = (str) => {
  const regul = /\r?\n|\r/g;
  const result = str.split(regul);
  return result.length ? result : [str]; 
};


export const PressFormScheme = z
	.object({
    file: z.any()
    .refine((file) => checkFileSize(file, MAX_SIZE_IMG),"Max.розмір 500КБ")
    .refine((file) => validateFileTypes(file, ACCEPTED_IMAGE_TYPES),"Формат JPG, PNG, WEBP")
    .transform((value) => transformFileValue(value, ACCEPTED_IMAGE_TYPES)),

		title: z.string()
      .trim()
      .min(1, { message: "Це поле обов'язкове"})
      .min(5, { message: 'Мінімум 5 символа' })
      .max(100, { message: 'Максимум 100 знаків' })
      .regex(patternText, { message: 'Введіть коректну назву' }),

    description: z.string()
      .trim()
      .min(1, { message: "Це поле обов'язкове"})
      .min(50, { message: 'Мінімум 50 знаків'})
      .transform(normalizeTextValue)
      .pipe(z.string()
      .max(250, { message: 'Текст максимум 250 знаків'})
      .regex(patternText, { message: 'Присутні не коректні символи'})),

    link: z.string()
      .trim()
      .min(1, { message: "Це поле обов'язкове"}),
      // .regex(patternUrlLinkedin, { message: 'Введіть дійсний URL'}),

    date:z.string()
      .trim()
      .min(1, { message: "Це поле обов'язкове"})
      .regex(patternDateValue, { message: 'Введіть коректну дату' })
      .refine((value) => minDateValue(value),{ message: "Мінімальна дата 01-04-2023" })
      .transform((value) => formatDateToNumericInputDate({dateString:value})),
       
})

//  Схема відправки на бекенд:{
// {
//   "title": "example",
//   "text": "Long text",
//   "date": 888888444440,
//   "file": "image file (JPG, PNG, WEBP)"
// }