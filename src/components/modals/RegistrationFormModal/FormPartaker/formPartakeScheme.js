import { z } from "zod";
import { patternEmail, patternName, patternNikDiscord, patternPhone, patternUrlLinkedin, patternText, patternEmailNonRu } from "@/src/constants/regulars";
import { formatPhoneNumber } from "@/src/lib/utils/formatPhoneNumber";

export const partakerDefaultValues= {
  firstName: "",
  lastName: "",
  specialization:"",
  email: "",
  phone:"",
  city:'',
  country:'',
  discord: '',
  linkedin: '',
  experience: '',
	motivation: '',
  sawQuestionnaire: '',
  agree_conditions: false,
  agree: false,
}

export const PartakerSchema = z
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
    .regex(patternEmailNonRu, { message: 'invalid_ru' }),

    phone: z.string()
    .trim()
    .min(1, { message: 'phone' })
    .regex(patternPhone, { message: 'incorrect_phone' })
    .transform(value=>  formatPhoneNumber(value)),

    city: z.string()
    .trim()
    .min(1, { message: 'city' })
    .max(30, { message: 'city_max' })
    .regex(patternText, { message: 'incorrect_city' }),

    country: z.string()
    .trim()
    .min(1, { message: 'country' })
    .max(30, { message: 'country_max' })
    .regex(patternText, { message: 'incorrect_country' }),

    discord: z.string()
    .trim()
    .min(1, { message: 'discord' })
    .regex(patternNikDiscord, { message: 'incorrect_discord' }),

    linkedin: z.string()
    .trim()
    .min(1, { message: 'linkedin' })
    .url({ message: "invalid_url" })
    .regex(patternUrlLinkedin, { message: 'invalid_url' }),

    experience: z.string()
    .trim()
    .min(1, { message: 'experience' })
    .transform(value=>  value==='true'),

    motivation: z.string()
    .trim()
    .min(1, { message: 'motivation' })
    .max(50, { message: 'motivation_max' })
    .regex(patternText, { message: 'incorrect_motivation' }),

    sawQuestionnaire: z.string()
    .trim()
    .min(1, { message: 'experience' }),

    agree_conditions: z.boolean().refine(value => value === true, "You must agree to the terms and conditions"),

    agree: z.boolean().refine(value => value === true, "You must agree to the terms and conditions")
	});

// Форма учасника {
//   firstName: 'string',
//   lastName: 'string',
//   specialization:'string', // UI\UX designer
//   email: 'string',  //email@gmail.com
//   phone:'string',
//   city:'string',
//   country:'string',
//   discord: 'string',
//   linkedin: 'string', // https://www.linkedin.com/in/{user name}
//   experience:'string', 'bооlean'
// 	 motivation: 'string',
//   sawQuestionnaire: "Я побачив/побачила анкету:",
// }

