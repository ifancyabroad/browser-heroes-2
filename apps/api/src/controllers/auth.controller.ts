import type { Request, Response } from "express";
import { createGuestUser, getUserById, toAuthUserView } from "../services/auth.service";

export async function createGuestSession(req: Request, res: Response) {
	if (req.session.userId) {
		const existingUser = await getUserById(req.session.userId);

		if (existingUser) {
			res.status(200).json({
				user: toAuthUserView(existingUser),
			});
			return;
		}

		req.session.userId = undefined;
	}

	const user = await createGuestUser();

	req.session.userId = user._id.toString();

	res.status(201).json({
		user: toAuthUserView(user),
	});
}

export async function getCurrentUser(req: Request, res: Response) {
	if (!req.session.userId) {
		res.status(200).json({
			user: null,
		});
		return;
	}

	const user = await getUserById(req.session.userId);

	if (!user) {
		req.session.userId = undefined;

		res.status(200).json({
			user: null,
		});
		return;
	}

	res.status(200).json({
		user: toAuthUserView(user),
	});
}
