import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { env } from "../config/env";

const ses = new SESClient({ region: env.AWS_REGION });

async function sendEmail(input: { to: string; subject: string; text: string; replyTo?: string }) {
	if (env.EMAIL_DELIVERY === "log") {
		console.info(`[email:${input.to}] ${input.subject}\n${input.text}`);
		return;
	}

	await ses.send(
		new SendEmailCommand({
			Source: `Browser Heroes <${env.SES_FROM_EMAIL}>`,
			ReplyToAddresses: [input.replyTo ?? env.SES_FROM_EMAIL],
			Destination: { ToAddresses: [input.to] },
			Message: {
				Subject: { Data: input.subject },
				Body: { Text: { Data: input.text } },
			},
		}),
	);
}

export function sendContactEmail(input: { email: string; subject: string; message: string }) {
	return sendEmail({
		to: "info@browserheroes.com",
		subject: `[Browser Heroes contact] ${input.subject}`,
		text: `From: ${input.email}\n\n${input.message}`,
		replyTo: input.email,
	});
}

export function sendPasswordResetEmail(email: string, token: string) {
	const url = new URL("/reset-password", env.APP_URL);
	url.searchParams.set("token", token);
	return sendEmail({
		to: email,
		subject: "Reset your Browser Heroes password",
		text: `Reset your password by opening this link within 60 minutes:\n\n${url}\n\nIf you did not request this, you can ignore this email.`,
	});
}
