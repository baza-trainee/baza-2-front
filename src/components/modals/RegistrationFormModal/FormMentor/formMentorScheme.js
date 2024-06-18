import { patternEmail, patternName, patternPhone, patternUrlLinkedin } from "@/src/constants/regulars";
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
 
// export function formatPhoneNumber(number) {
// if( /^\+380[\s]\d{2}[\s]\d{3}[\s]\d{2}[\s]\d{2}$/.test(number)){return number}

//   let formattedNumber = '';
//   let numberString = number;
//   formattedNumber += numberString.slice(0, 4) + ' ';
//   formattedNumber += numberString.slice(4, 6) + ' ';
//   formattedNumber += numberString.slice(6, 9) + ' ';
//   formattedNumber += numberString.slice(9, 11) + ' ';
//   formattedNumber += numberString.slice(11);
//   return formattedNumber;
// }

export function formatPhoneNumber(number) {
  // Видаляємо будь-які нецифрові символи з номеру телефону
 const phoneNumber = number.replace(/\D/g, '');

  // Перевіряємо, чи довжина номеру телефону дорівнює 12 (припускаємо, що вхідний формат правильний)
  if (phoneNumber.length === 12) {
      // Форматуємо номер у вигляді +380 67 760 65 08
      return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 5)} ${phoneNumber.slice(5, 8)} ${phoneNumber.slice(8, 10)} ${phoneNumber.slice(10, 12)}`;
  } else {
      // Якщо номер не відповідає очікуваній довжині, повертаємо не змінений рядок або можемо повернути помилку
      return number;
  }
}

// Приклад використання:
const phoneNumber = "=38067 760650 8";
const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
console.log(formattedPhoneNumber); // Виведе: +380 67 760 65 08


// const phoneFormat = (s) => {
//   //const startsWith = plus ? '+7' : '8';
//   //const startsWith = '+';
//   //let x = parseInt(s.replace(/[^\d]/g, ''))
//   let phone = parseInt(s.replace(/[^\d]/g, ''))
// //let phone = s.replace(/[^0-9]/g, '');
//   // if (phone.startsWith('7') && plus) {
//   //   phone = phone.substr(1);
//   // }
//   // if (phone.startsWith('8')) {
//   //   phone = phone.substr(1);
//   // }
//   return phone
//   //return phone.replace(/\d{3}\d{3}\d{2}\d{2} /g, `${startsWith} $1 $2 $3 $4`);
// };
// console.log(phoneFormat('+380 67 760 65 08'))
 //89992223355 -> +7 999 222 33 55
//  @param {string} s номер телефона
//  @param {boolean} [plus=true] формат +7 или 8



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
    //.min(13, { message: 'phone' })
    .regex(patternPhone, { message: 'incorrect_phone' })
    .transform(value=>  formatPhoneNumber(value)),

    discord: z.string()
    .trim()
    .min(1, { message: 'discord' }),

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

