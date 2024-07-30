import { z } from "zod";
import { patternLink, patternName } from "@/src/constants/regulars";

export const addPartnerDefaultValues= {
  name: "",
  homeUrl:"",
  imageUrl:""
}

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  'jpeg',
  'png',
  'webp',
  'jpg',
];

function checkFileType(file) {
  if (file?.name) {
    const fileType = file.name.split(".").pop().toLowerCase();
    if (ACCEPTED_IMAGE_TYPES.includes(fileType)) return true;
  }
  return false;
}


export const addPartnerSchema = z
	.object({
		name: z.string()
    .trim()
    .min(2, { message: 'Поле назва не може бути порожнім' })
    .regex(patternName, { message: 'Введіть дійсну назву' }),

    homeUrl: z.string()
    .trim()
    .min(1, { message: 'Поле посилання не може бути порожнім' })
    .regex(patternLink, { message: 'Введіть дійсний URL' }),

    imageUrl: z.any()
    .refine((file) => file?.length !== 0, "Додайте логотип")
    .refine((file) => file[0]?.size < MAX_FILE_SIZE, "Максимальний розмір 2MB")
    .refine((file) => checkFileType(file[0]), "Формат зображення може бути JPG, PNG або WEBP"),
})