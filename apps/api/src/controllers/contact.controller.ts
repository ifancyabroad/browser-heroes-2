import type { Request, Response } from "express";
import type { ContactBody, MessageResponse } from "@app/shared";
import { sendContactEmail } from "../services/email.service";

export async function submitContact(
	req: Request<unknown, unknown, ContactBody>,
	res: Response<MessageResponse>,
) {
	await sendContactEmail(req.body);
	res.status(202).json({ message: "Thanks — your message has been sent." });
}
