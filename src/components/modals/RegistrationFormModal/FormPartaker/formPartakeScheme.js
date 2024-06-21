import { z } from "zod";
import { patternEmail, patternName, patternNikDiscord, patternPhone, patternUrlLinkedin } from "@/src/constants/regulars";
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
  courseName:'',
  courseName:'',
  experience:'',
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
    .regex(patternEmail, { message: 'invalid_ru' }),

    phone: z.string()
    .trim()
    .min(1, { message: 'phone' })
    .regex(patternPhone, { message: 'incorrect_phone' })
    .transform(value=>  formatPhoneNumber(value)),

    city: z.string()
    .trim()
    .min(1, { message: 'lastName' })
    .min(2, { message: 'lastName_min' })
    .max(50, { message: 'lastName_max' })
    .regex(patternName, { message: 'incorrect_lastName' }),

    country: z.string()
    .trim()
    .min(1, { message: 'lastName' })
    .min(2, { message: 'lastName_min' })
    .max(50, { message: 'lastName_max' })
    .regex(patternName, { message: 'incorrect_lastName' }),

    discord: z.string()
    .trim()
    .min(1, { message: 'discord' })
    .regex(patternNikDiscord, { message: 'incorrect_discord' }),

    linkedin: z.string()
    .trim()
    .min(1, { message: 'linkedin' })
    .url({ message: "invalid_url" })
    .regex(patternUrlLinkedin, { message: 'invalid_url' }),

    // courseName: z.string()
    // .trim()
    // .min(1, { message: 'course_name' }),

    experience: z.string()
    .trim()
    .min(1, { message: 'experience' }),

    motivation: z.string()
    .trim()
    .min(1, { message: 'experience' }),

    sawQuestionnaire: z.string()
    sawQuestionnaire: z.string()
    .trim()
    .min(1, { message: 'experience' }),

    agree_conditions: z.boolean().refine(value => value === true, "You must agree to the terms and conditions"),

    agree: z.boolean().refine(value => value === true, "You must agree to the terms and conditions")
	});


export const formScheme = {
  defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    phone:"",
    country:'',
    city:'',
    discord: "",
    linkedin: "",
    specialization:"",
    convenient_time:"",
    agree: false,
  },
  firstName:{
    required: true, 
    minLength:2, 
    maxLength:30, 
    // регуярний вираз блокує російські літери.
     pattern: /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}](?:[\p{L} '-]{0,28}[\p{L}])?$/ugi
  },
  lastName:{
    required: true, 
    minLength:2, 
    maxLength:30, 
    // регуярний вираз блокує російські літери.
     pattern: /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}](?:[\p{L} '-]{0,28}[\p{L}])?$/ugi
  },
  specialization:{
    required: true, 
    // minLength:2, 
    // maxLength:30, 
    // регуярний вираз блокує російські літери.
    //  pattern: /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}](?:[\p{L} '-]{0,28}[\p{L}])?$/ugi
  },
  email:{
    required: true,
    minLength:2,
    maxLength:50,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?!ru$|рф$|by$)[A-Z]{2,}$/i
  },
  phone:{
    required: true,
    minLength:13,
    maxLength:17,
    //pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?!ru$|рф$)[A-Z]{2,}$/i
  },
  country:{
    required: true,
    minLength:2, 
    maxLength:30, 
    // регуярний вираз блокує російські літери.
     pattern: /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}](?:[\p{L} '-]{0,28}[\p{L}])?$/ugi
  },
  city:{
    required: true,
    minLength:2, 
    maxLength:30, 
    // регуярний вираз блокує російські літери.
     pattern: /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}](?:[\p{L} '-]{0,28}[\p{L}])?$/ugi
  },
  discord:{
    required: true,
    minLength:2,
    maxLength:50,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?!ru$|рф$)[A-Z]{2,}$/i
  }, 
  linkedin:{
    required: true,
    minLength:2,
    maxLength:50,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?!ru$|рф$)[A-Z]{2,}$/i
  },
  convenient_time:{
    required: true, 
  },
  agree:{
    required: true, 
  }
};

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
//   courseName:'string'
//   experience:'string', //'Так/Ні'  або 'bооlean'?
// 	 motivation: 'string',
//   sawQuestionnaire: "Я побачив/побачила анкету:",
// }

