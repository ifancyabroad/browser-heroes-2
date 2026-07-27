import type { Request, Response } from "express";
import type {
	AuthUserResponse,
	EmailBody,
	LoginBody,
	MessageResponse,
	RegisterBody,
	ResetPasswordBody,
} from "@app/shared";
import {
	loginAccount,
	registerGuest,
	requestPasswordReset,
	resetPassword,
} from "../services/account.service";
import {
	createGuestUser,
	getUserById,
	toAuthUserView,
	touchGuestActivity,
} from "../services/auth.service";

function regenerateSession(req: { session: Request["session"] }, userId: string) {
	return new Promise<void>((resolve, reject) => {
		req.session.regenerate((error) => {
			if (error) return reject(error);
			req.session.userId = userId;
			req.session.save((saveError) => (saveError ? reject(saveError) : resolve()));
		});
	});
}

export async function createGuestSession(req: Request, res: Response<AuthUserResponse>) {
	if (req.session.userId) {
		const existingUser = await getUserById(req.session.userId);
		if (existingUser) {
			await touchGuestActivity(String(existingUser._id));
			res.status(200).json({ user: toAuthUserView(existingUser) });
			return;
		}
		req.session.userId = undefined;
	}
	const user = await createGuestUser();
	req.session.userId = String(user._id);
	res.status(201).json({ user: toAuthUserView(user) });
}

export async function getCurrentUser(req: Request, res: Response<AuthUserResponse>) {
	if (!req.session.userId) return void res.status(200).json({ user: null });
	const user = await getUserById(req.session.userId);
	if (!user) {
		req.session.userId = undefined;
		return void res.status(200).json({ user: null });
	}
	await touchGuestActivity(String(user._id));
	res.status(200).json({ user: toAuthUserView(user) });
}

export async function register(
	req: Request<unknown, unknown, RegisterBody>,
	res: Response<AuthUserResponse>,
) {
	if (!req.session.userId)
		throw Object.assign(new Error("A guest session is required."), { status: 401 });
	const user = await registerGuest({ userId: req.session.userId, ...req.body });
	await regenerateSession(req, String(user._id));
	res.status(201).json({ user: toAuthUserView(user) });
}

export async function login(
	req: Request<unknown, unknown, LoginBody>,
	res: Response<AuthUserResponse>,
) {
	const user = await loginAccount(req.body);
	await regenerateSession(req, String(user._id));
	res.json({ user: toAuthUserView(user) });
}

export async function logout(req: Request, res: Response<MessageResponse>) {
	await new Promise<void>((resolve, reject) =>
		req.session.destroy((error) => (error ? reject(error) : resolve())),
	);
	res.clearCookie("bh2.sid");
	res.json({ message: "Signed out." });
}

export async function forgotPassword(
	req: Request<unknown, unknown, EmailBody>,
	res: Response<MessageResponse>,
) {
	void Promise.resolve(requestPasswordReset(req.body.email)).catch((error) => {
		console.error("Unable to send password reset email.", error);
	});
	res.json({ message: "If that account exists, a reset email has been sent." });
}

export async function finishPasswordReset(
	req: Request<unknown, unknown, ResetPasswordBody>,
	res: Response<MessageResponse>,
) {
	await resetPassword(req.body.token, req.body.password);
	res.json({ message: "Password reset. You can now sign in." });
}
