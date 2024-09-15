import { z } from "zod";
import { patternDateValue, patternText } from "@/src/constants/regulars";
import { ACCEPTED_IMAGE_TYPES } from "@/src/lib/hooks/checkFileType";
import { formatDateToNumericInputDate } from "@/src/lib/utils/formatData";
import { checkFileSize } from "@/src/lib/hooks/checkFileSize";
import { validateFileTypes } from "@/src/lib/hooks/validateFileTypes";
import { transformFileValue } from "@/src/lib/hooks/transformFileValue";
import { minDateValue } from "@/src/lib/hooks/minMaxDate";

export const articleDefaultValues = {
  file: null,
  title: "",
  text: "",
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

const empryFile=(value)=>{
  if(value && value.length){return true}else return false
}

// Базова схема
const Base = z.object({
  title: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 символа' })
    .max(100, { message: 'Максимум 100 знаків' })
    .regex(patternText, { message: 'Присутні некоректні символи' }),

  text: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(50, { message: 'Мінімум 50 знаків'})
    .max(2000, { message: 'Текст максимум 2000 символів'})
    .transform(strToArr) // Перетворюємо рядок на масив рядків
    .pipe(z.array(
      z.string()
      .regex(patternText) // Валідуємо кожен рядок у масиві
    )
    .transform((value)=> value.join('\r'))), // Перетворюємо масив назад на рядок з переносами

  date:z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .regex(patternDateValue, { message: 'Введіть коректну дату' })
    .refine((value) => minDateValue(value),{ message: "Мінімальна дата 01-04-2023" })
    .transform((value) => formatDateToNumericInputDate({dateString:value})),
});

// Схема "Редагувати контент"
export const ArticleScheme = Base.extend({
  file: z.any()
    .refine((file) => checkFileSize(file, MAX_SIZE_IMG),"Max.розмір 500КБ")
    .refine((file) => validateFileTypes(file, ACCEPTED_IMAGE_TYPES),"Формат JPG, PNG, WEBP")
    .transform((value) => transformFileValue(value, ACCEPTED_IMAGE_TYPES)),   
})
// Схема "Додати контент"
export const ArticleAddScheme = Base.extend({
  file: z.any()
    .refine((file) => empryFile(file),"Це поле обов'язкове")
    .refine((file) => checkFileSize(file, MAX_SIZE_IMG),"Max.розмір 500КБ")
    .refine((file) => validateFileTypes(file, ACCEPTED_IMAGE_TYPES),"Формат JPG, PNG, WEBP")
    .transform((value) => transformFileValue(value, ACCEPTED_IMAGE_TYPES)),     
})

//  Схема відправки на бекенд:{
// {
//   "title": "example",
//   "text": "Long text",
//   "date": 888888444440,
//   "file": "image file (JPG, PNG, WEBP)"
// }