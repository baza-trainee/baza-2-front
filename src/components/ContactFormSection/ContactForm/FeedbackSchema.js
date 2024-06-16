import { z } from "zod";
import { patternEmail, patternMessage, patternName } from "@/src/constants/regulars";

export const feedbackDefaultValues = { firstName: '', email:'', message:''};

export const FeedbackSchema = z
	.object({
		firstName: z.string()
    .trim()
    .min(2, { message: 'name' })
    .max(30, { message: 'name_long' })
    .regex(patternName, { message: 'name_long' }),

		email: z.string()
    .trim()
    .min(2, { message: 'email' }).email({ message: 'invalid_email' })
    .regex(patternEmail, { message: 'invalid_email' }),

    message: z.string()
    .trim()
    .min(10, { message: 'message' })
    .max(300, { message: 'message_long' })
    .regex(patternMessage, { message: 'invalid_message' }),
	});