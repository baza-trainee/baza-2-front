import { patternEmail, patternName, patternPhone } from "@/src/constants/regulars";
import { z } from "zod";

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
 
export function formatPhoneNumber(number) {
if( /^\+380[\s]\d{2}[\s]\d{3}[\s]\d{2}[\s]\d{2}$/.test(number)){return number}

  let formattedNumber = '';
  let numberString = number;
  formattedNumber += numberString.slice(0, 4) + ' ';
  formattedNumber += numberString.slice(4, 6) + ' ';
  formattedNumber += numberString.slice(6, 9) + ' ';
  formattedNumber += numberString.slice(9, 11) + ' ';
  formattedNumber += numberString.slice(11);
  return formattedNumber;
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
    .regex(patternEmail, { message: 'invalid_ru' }),

    phone: z.string()
    .trim()
    .min(1, { message: 'phone' })
    .regex(patternPhone, { message: 'incorrect_phone' }),
    //.transform(value=> formatPhoneNumber(value)),

    discord: z.string()
    .trim()
    .min(1, { message: 'discord' }),

    linkedin: z.string()
    .trim()
    .min(1, { message: 'linkedin' }),

    convenient_time: z.string()
    .trim()
    .min(1, { message: 'convenient_time' }),

    agree: z.boolean().refine(value => value === true, "You must agree to the terms and conditions")
	});

// const form = {
//   firstName: 'string',
//   lastName: 'string',
//   email: 'string',  //email@gmail.com
//   phone:'string',   //+38 111 22 33
//   discord: 'string',
//   linkedin: 'string',
//   specialization:'string', // UI\UX designer
//   convenient_time:'string',// 18.00-21.00
// }

// const form2 = {
//   // Форма учасника 
//   firstName: 'string',
//   lastName: 'string',
//   specialization:'string', // UI\UX designer
//   phone:'string',
//   email: 'string',  //email@gmail.com
//   country:'string',
//   city:'string',
//   discord: 'string',
//   linkedin: 'string'
// }

