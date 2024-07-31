import { z } from "zod";
import { patternLink, patternName } from "@/src/constants/regulars";
import { ACCEPTED_IMAGE_TYPES, checkFileType, MAX_FILE_SIZE_IMG } from "@/src/lib/hooks/checkFileType";

export const addPartnerDefaultValues= {
  name: "",
  homeUrl:"",
  imageUrl:""
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
    .refine((file) => file[0]?.size < MAX_FILE_SIZE_IMG, "Максимальний розмір 2MB")
    .refine((file) => checkFileType(file[0],ACCEPTED_IMAGE_TYPES), "Формат зображення може бути JPG, PNG або WEBP"),
})