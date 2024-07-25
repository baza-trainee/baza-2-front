import { z } from "zod";
import { patternEmail, patternEmailNonRu, patternMessage, patternName } from "@/src/constants/regulars";

export const feedbackDefaultValues = { firstName: '', email:'', message:''};

export const FeedbackSchema = z
	.object({
		firstName: z.string()
    .trim()
    .min(1, { message: 'name' })
    .min(2, { message: 'name_min' })
    .max(30, { message: 'name_max' })
    .regex(patternName, { message: 'incorrect_name' }),

		email: z.string()
    .trim()
    .min(2, { message: 'email' })
    .email({ message: 'incorrect_email' })
    .regex(patternEmail, { message: 'incorrect_email' })
    .regex(patternEmailNonRu, { message: 'invalid_ru' }),

    message: z.string()
    .trim()
    .min(1, { message: 'message' })
    .min(10, { message: 'message_min' })
    .max(300, { message: 'message_max' })
    .regex(patternMessage, { message: 'incorrect_message' }),
	});