import { z } from "zod";
import { patternText } from "@/src/constants/regulars";
import { ACCEPTED_IMAGE_TYPES, checkFileType } from "@/src/lib/hooks/checkFileType";
import { formatDateToNumericInputDate } from "@/src/lib/utils/formatData";
import { checkFileSize } from "@/src/lib/hooks/checkFileSize";

export const articleDefaultValues = {
  file: null,
  title: "",
  text: "",
  date:""
}

const MAX_SIZE_IMG = 512000

const validateImageTypes =(value)=>{
  if(value == ''){
    return true
  }else if(value){
    return checkFileType(value[0], ACCEPTED_IMAGE_TYPES)
  }
}

const transformImageValue = (value)=>{
  if(value === ''){
    return ''
  }else if(value){
    return value[0]
  }
}

const normalize = (text) => text.replace(/\r?\n|\r/g, '');

const patternDateValue = /^\d{4}-\d{2}-\d{2}$/

const minDateValue=(value, minDate="2023-04-01")=>{
  if(value===''){
    return true
  }else {
   return formatDateToNumericInputDate({dateString:value}) >= formatDateToNumericInputDate({dateString:minDate})
  }
}

export const ArticleScheme = z
	.object({
    file: z.any()
    .refine((file) => checkFileSize(file, MAX_SIZE_IMG),"Max.розмір 500КБ")
    .refine((file) => validateImageTypes(file),"Формат JPG, PNG, WEBP")
    .transform((value) => transformImageValue(value, ACCEPTED_IMAGE_TYPES)),

		title: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 символа' })
    .max(100, { message: 'Максимум 100 знаків' })
    .regex(patternText, { message: 'Введіть коректну назву' }),


    text: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(50, { message: 'Мінімум 50 знаків'})
    .transform(normalize)
    .pipe(z.string()
    .max(2000, { message: 'Текст максимум 2000 символів'})
    .regex(patternText, { message: 'Присутні не коректні символи'})),

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