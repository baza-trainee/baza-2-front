import { z } from "zod";
import { ACCEPTED_DOCUMENTS_TYPES } from "@/src/lib/hooks/checkFileType";
import { checkFileSize } from "@/src/lib/hooks/checkFileSize";
import { validateFileTypes } from "@/src/lib/hooks/validateFileTypes";
import { transformFileValue } from "@/src/lib/hooks/transformFileValue";

export const documentsDefaultValues = {
  report: null,
  statute: null,
  privacy_policy: null,
  terms_of_use: null,
  rules: null,
}

// максимальний розмір файла 500КБ
const MAX_SIZE_DOC = 512000

export const documentsScheme = z
	.object({
    report: z.any()
      .refine((file) => checkFileSize(file, MAX_SIZE_DOC),"Max.розмір 500КБ")
      .refine((file) => validateFileTypes(file, ACCEPTED_DOCUMENTS_TYPES),"Формат PDF")
      .transform((value) => transformFileValue(value, ACCEPTED_DOCUMENTS_TYPES)),

    statute: z.any()
      .refine((file) => checkFileSize(file, MAX_SIZE_DOC),"Max.розмір 500КБ")
      .refine((file) => validateFileTypes(file, ACCEPTED_DOCUMENTS_TYPES),"Формат PDF")
      .transform((value) => transformFileValue(value, ACCEPTED_DOCUMENTS_TYPES)),

    privacy_policy: z.any()
      .refine((file) => checkFileSize(file, MAX_SIZE_DOC),"Max.розмір 500КБ")
      .refine((file) => validateFileTypes(file, ACCEPTED_DOCUMENTS_TYPES),"Формат PDF")
      .transform((value) => transformFileValue(value, ACCEPTED_DOCUMENTS_TYPES)),    
      
    terms_of_use: z.any()
      .refine((file) => checkFileSize(file, MAX_SIZE_DOC),"Max.розмір 500КБ")
      .refine((file) => validateFileTypes(file, ACCEPTED_DOCUMENTS_TYPES),"Формат PDF")
      .transform((value) => transformFileValue(value, ACCEPTED_DOCUMENTS_TYPES)),
      
    rules: z.any()
      .refine((file) => checkFileSize(file, MAX_SIZE_DOC),"Max.розмір 500КБ")
      .refine((file) => validateFileTypes(file, ACCEPTED_DOCUMENTS_TYPES),"Формат PDF")
      .transform((value) => transformFileValue(value, ACCEPTED_DOCUMENTS_TYPES)),     
})
//  Схема відправки на бекенд:{
// maximum limit of 512000 bytes"

// { 
//   report: "report.pdf",
//   statute: "statute.pdf",
//   privacyPolicy: {
//     ua: "privacy_ua.pdf"
//   },
//   termsOfUse: {
//     ua: "terms_ua.pdf"
//   }
// }