import { z } from "zod";


// import { z } from 'zod'
// import { ZipCodeSchema, StreetSchema, CitySchema, RegionSchema } from './shared/schema'
// import { codeReg } from './regex'

// export const LEGAL_FORMS = ['ТОВ', 'ФОП'] as const

export const FeedbackSchema = z
	.object({
		firstName: z.string()
    .min(2, { message: 'Введіть назву компанії' })
    .max(30, { message: 'Введіть назву компанії' }),



		email: z.string().email().min(2, { message: 'Введіть інформацію про компанію' }),
    message: z.string()
    .trim()
    .min(10, { message: 'Введіть інформацію про компанію' })
    .max(300, { message: 'Введіть назву компанії' }),
		// form: z.enum(LEGAL_FORMS, {
		// 	required_error: 'Оберіть організаційно-правову форму'
		// }),
		// code: z
		// 	.string()
		// 	.min(1, { message: 'Вкажіть ІПН або ЄДРПОУ' })
		// 	.regex(codeReg, { message: 'ІПН або ЄДРПОУ повинно складатися з 8 або 10 цифр' }),
		// region: RegionSchema,
		// district: z.string().min(2, { message: 'Введіть назву району' }),
		// city: CitySchema,
		// street: StreetSchema,
		// zipCode: ZipCodeSchema
	});
	// .superRefine((values, context) => {
	// 	if (values.form === 'ТОВ' && values.code.length !== 8) {
	// 		context.addIssue({
	// 			code: z.ZodIssueCode.custom,
	// 			message: 'Код ЄДРПОУ повинен складатися з 8 цифр',
	// 			path: ['code']
	// 		})
	// 	}
	// 	if (values.form === 'ФОП' && values.code.length !== 10) {
	// 		context.addIssue({
	// 			code: z.ZodIssueCode.custom,
	// 			message: 'Код ІПН повинен складатися з 10 цифр',
	// 			path: ['code']
	// 		})
	// 	}
	// })





const User = z.object({
  username: z.string(),
});

User.parse({ username: "Ludwig" });


const emailSchema = z.string().email({ message: "Invalid email address" });

try {

  emailSchema.parse("test@example.com"); // Замените на email, который вы хотите проверить.
  
  console.log("Действительный email");
  
  } catch (error) {
  
  console.error(error.errors); // При этом будет выведено пользовательское сообщение, если письмо недействительно
  
  }



// extract the inferred type
//type User = z.infer<typeof User>;
// { username: string }


export const formScheme={
  defaultValues: { firstName: '', email:'', message:''},
  firstName:{
    required: true, 
    minLength:2, 
    maxLength:30, 
    // регуярний вираз блокує російські літери.
     pattern: /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}](?:[\p{L} '-]{0,28}[\p{L}])?$/ugi


  },
  email:{
    required: true,
    minLength:2,
    maxLength:50,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?!ru$|by$)[A-Z]{2,}$/i
  },
  message:{
    required: true, 
    minLength:2, 
    maxLength:300,
    // регуярний вираз блокує російські літери.
    pattern:/^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}\d\s.,!?'-\[\]{}()]{9,300}$/ugi
  }
}