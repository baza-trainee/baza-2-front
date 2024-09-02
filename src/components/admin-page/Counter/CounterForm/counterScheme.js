import { z } from "zod";
import { patternNumberInput } from "@/src/constants/regulars";

export const counterDefaultValues= {
  projects:'',
  members:'',
  employed: '',
}

export const counterSchema = z
	.object({
    projects: z.string()
      .trim()
      .regex(patternNumberInput, { message: 'Введіть коректне значення' })
      .optional(),

    members: z.string()
      .trim()
      .regex(patternNumberInput, { message: 'Введіть коректне значення' })
      .optional(),

    employed: z.string()
      .trim()
      .regex(patternNumberInput, { message: 'Введіть коректне значення' })
      .optional(), 
  })

  // {
  //   "projects": 5,
  //   "members": 201,
  //   "employed": 99
  // } 