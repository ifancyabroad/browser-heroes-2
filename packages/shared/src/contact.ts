import { z } from "zod";

export const CONTACT_SUBJECT_MAX_LENGTH = 120;
export const CONTACT_MESSAGE_MAX_LENGTH = 5000;

export const contactBodySchema = z.object({
	email: z.string().trim().max(254).pipe(z.email()),
	subject: z
		.string()
		.trim()
		.min(1)
		.max(CONTACT_SUBJECT_MAX_LENGTH)
		.refine((value) => !/[\r\n]/.test(value), "Subject must be a single line."),
	message: z.string().trim().min(1).max(CONTACT_MESSAGE_MAX_LENGTH),
});

export type ContactBody = z.infer<typeof contactBodySchema>;
