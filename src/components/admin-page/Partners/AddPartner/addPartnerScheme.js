import { z } from "zod";
import { patternEmail, patternEmailNonRu, patternPassword,  } from "@/src/constants/regulars";

export const addPartnerDefaultValues= {
  name: "",
  homeUrl:"",
  imageUrl:""
}
// {
//   "name": "example",
//   "homeUrl": "https://example.com",
//   "imageUrl": "image.jpg"
// }.png, .jpg, .jpeg

const MAX_FILE_SIZE = 2000000;
function checkFileType(file) {
  //console.log(file)
    if (file?.name) {
        const fileType = file.name.split(".").pop().toLowerCase();
        //console.log(fileType)
        if (fileType === "jpg" || fileType === "png" || fileType === "WEBP"|| fileType === "jpeg") return true;
    }
    return false;
}


export const addPartnerSchema = z
	.object({
		name: z.string()
    .trim()
    .min(2, { message: 'Поле email не може бути порожнім' }),
    // .email({ message: 'Введіть дійсний email' })
    // .regex(patternEmail, { message: 'Введіть дійсний email' })
    // .regex(patternEmailNonRu, { message: 'Домени .ru і .by не допускаються' }),

    homeUrl: z.string()
    .trim()
    .min(1, { message: 'Поле пароль не може бути порожнім' }),
    // .min(8, { message: 'Пароль має містити мінімум 8 символів' })
    // .max(14, {message: 'Пароль має містити максимум 14 символів'})
    // .regex(patternPassword, { message: 'Пароль має містити цифри та латинські літери' }),

    imageUrl: z.any()
    .refine((file) => file?.length !== 0, "Додайте логотип")
    .refine((file) => file[0]?.size < MAX_FILE_SIZE, "Максимальний розмір 2MB")
    .refine((file) => checkFileType(file[0]), "Формат зображення JPG, PNG, WEBP"),

    // imageUrl:  z
    // .any()
    // .refine((files) => files?.length == 1, "File is required.")  
})
// const MAX_FILE_SIZE = 5000000;
// function checkFileType(file: File) {
//     if (file?.name) {
//         const fileType = file.name.split(".").pop();
//         if (fileType === "docx" || fileType === "pdf") return true;
//     }
//     return false;
// }

// export const fileSchema = z.object({
// z.any()
// .refine((file: File) => file?.length !== 0, "File is required")
// .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
// .refine((file) => checkFileType(file), "Only .pdf, .docx formats are supported."),`
// });
 