import mongoose from "mongoose";
import profanityFilter from "leo-profanity";
import { UserModel } from "../models/user.model";
import { sendPasswordResetEmail } from "./email.service";
import { hashPassword, verifyPassword } from "./password.service";
import { consumeAuthToken, deleteUnusedAuthTokens, issueAuthToken } from "./authToken.service";

const RESET_TOKEN_MS = 60 * 60 * 1000;
const dummyPasswordHash = hashPassword("not-a-real-account-password");

function normalizeEmail(email: string) {
	return email.trim().toLowerCase();
}

function isDuplicateEmailError(error: unknown) {
	if (typeof error !== "object" || error === null || !("code" in error) || error.code !== 11000) {
		return false;
	}

	const keyPattern = "keyPattern" in error ? error.keyPattern : null;
	return typeof keyPattern === "object" && keyPattern !== null && "email" in keyPattern;
}

export async function registerGuest(input: {
	userId: string;
	displayName: string;
	email: string;
	password: string;
}) {
	if (profanityFilter.check(input.displayName.trim())) {
		throw Object.assign(new Error("Display name is not allowed."), { status: 400 });
	}

	const passwordHash = await hashPassword(input.password);
	let user;

	try {
		user = await UserModel.findOneAndUpdate(
			{ _id: input.userId, type: "guest" },
			{
				$set: {
					type: "registered",
					displayName: input.displayName.trim(),
					email: normalizeEmail(input.email),
					passwordHash,
					registeredAt: new Date(),
					lastActiveAt: new Date(),
				},
			},
			{ returnDocument: "after", runValidators: true },
		);
	} catch (error) {
		if (isDuplicateEmailError(error)) {
			throw Object.assign(new Error("An account with that email already exists."), {
				status: 409,
			});
		}
		throw error;
	}

	if (!user) {
		throw Object.assign(new Error("A guest session is required."), { status: 409 });
	}

	return user;
}

export async function loginAccount(input: { email: string; password: string }) {
	const user = await UserModel.findOne({
		type: "registered",
		email: normalizeEmail(input.email),
	}).select("+passwordHash");
	const passwordMatches = await verifyPassword(
		user?.passwordHash ?? (await dummyPasswordHash),
		input.password,
	);

	if (!user?.passwordHash || !passwordMatches) {
		throw Object.assign(new Error("Email or password is incorrect."), { status: 401 });
	}

	return user;
}

export async function requestPasswordReset(email: string) {
	const user = await UserModel.findOne({
		type: "registered",
		email: normalizeEmail(email),
	});

	if (!user?.email) {
		return;
	}

	const token = await issueAuthToken({
		userId: user._id,
		purpose: "reset-password",
		lifetimeMs: RESET_TOKEN_MS,
	});
	await sendPasswordResetEmail(user.email, token);
}

export async function resetPassword(token: string, password: string) {
	const record = await consumeAuthToken(token, "reset-password");

	if (!record) {
		throw Object.assign(new Error("Reset link is invalid or expired."), { status: 400 });
	}

	const passwordHash = await hashPassword(password);
	const user = await UserModel.findByIdAndUpdate(
		record.userId,
		{ $set: { passwordHash } },
		{ returnDocument: "after" },
	).orFail();

	await Promise.all([
		deleteUnusedAuthTokens(user._id, "reset-password"),
		mongoose.connection.collection("sessions").deleteMany({
			session: { $regex: `"userId":"${String(user._id)}"` },
		}),
	]);

	return user;
}
