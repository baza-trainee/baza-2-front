import { z } from "zod";
import { patternEmail, patternEmailNonRu, patternName, patternNikDiscord, patternPhone, patternUrlLinkedin } from "@/src/constants/regulars";
import { formatPhoneNumber } from "@/src/lib/utils/formatPhoneNumber";

export const mentorDefaultValues= {
  firstName: "",
  lastName: "",
  email: "",
  phone:"",
  discord: "",
  linkedin: "",
  specialization:"",
  convenient_time:"",
  agree: false,
}

const validatePhone=(value)=>{
  if(value === '+380'){
    return false
  }else true
}


export const MentorSchema = z
	.object({
		firstName: z.string()
    .trim()
    .min(1, { message: 'firstName' })
    .min(2, { message: 'firstName_min' })
    .max(30, { message: 'firstName_max' })
    .regex(patternName, { message: 'incorrect_firstName' }),

		lastName: z.string()
    .trim()
    .min(1, { message: 'lastName' })
    .min(2, { message: 'lastName_min' })
    .max(50, { message: 'lastName_max' })
    .regex(patternName, { message: 'incorrect_lastName' }),

		specialization: z.string()
    .trim()
    .min(1, { message: 'specialization' }),

		email: z.string()
    .trim()
    .min(2, { message: 'email' })
    .email({ message: 'incorrect_email' })
    .regex(patternEmail, { message: 'incorrect_email' })
    .refine(
      (value) => value.split('@')[0].length > 1,
      {
        message: 'incorrect_email',
      })
    .refine(
      (value) => !/(.ru|.by)$/.test(value.split('@')[1]),
      {
        message: 'invalid_ru',
      }),

    phone: z.string()
    .trim()
    .min(1, { message: 'phone' })
    .regex(patternPhone, { message: 'incorrect_phone' }),
    // .transform(value=>  formatPhoneNumber(value, true)),

    discord: z.string()
    .trim()
    .min(1, { message: 'discord' })
    .regex(patternNikDiscord, { message: 'incorrect_discord' }),

    linkedin: z.string()
    .trim()
    .min(1, { message: 'linkedin' })
    .url({ message: "invalid_url" })
    .regex(patternUrlLinkedin, { message: 'invalid_url' }),

    convenient_time: z.string()
    .trim()
    .min(1, { message: 'convenient_time' }),

    agree: z.boolean().refine(value => value === true, "You must agree to the terms and conditions")
	});

// Форма ментора{
//   firstName: 'string',
//   lastName: 'string',
//   email: 'string',  //email@gmail.com
//   phone:'string',   //+38 111 22 33
//   discord: 'string',
//   linkedin: 'string',
//   specialization:'string', // UI\UX designer
//   convenient_time:'string',// 18.00-21.00
// }