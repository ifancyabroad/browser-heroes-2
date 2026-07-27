import { beforeEach, describe, expect, it, vi } from "vitest";

const userModel = vi.hoisted(() => ({
	findOneAndUpdate: vi.fn(),
}));
const passwordService = vi.hoisted(() => ({
	hashPassword: vi.fn(),
	verifyPassword: vi.fn(),
}));
const authTokenService = vi.hoisted(() => ({
	consumeAuthToken: vi.fn(),
	deleteUnusedAuthTokens: vi.fn(),
	issueAuthToken: vi.fn(),
}));
const emailService = vi.hoisted(() => ({
	sendPasswordResetEmail: vi.fn(),
}));
const profanity = vi.hoisted(() => ({ check: vi.fn() }));

vi.mock("../models/user.model", () => ({ UserModel: userModel }));
vi.mock("./password.service", () => passwordService);
vi.mock("./authToken.service", () => authTokenService);
vi.mock("./email.service", () => emailService);
vi.mock("leo-profanity", () => ({ default: profanity }));

import { registerGuest } from "./account.service";

describe("account.service", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		profanity.check.mockReturnValue(false);
		passwordService.hashPassword.mockResolvedValue("password-hash");
	});

	it("translates only duplicate email index errors into an account conflict", async () => {
		userModel.findOneAndUpdate.mockRejectedValue({
			code: 11000,
			keyPattern: { email: 1 },
		});

		await expect(
			registerGuest({
				userId: "guest-id",
				displayName: "Player",
				email: "player@example.com",
				password: "long-password",
			}),
		).rejects.toMatchObject({
			message: "An account with that email already exists.",
			status: 409,
		});
	});

	it("does not mislabel unrelated duplicate key errors", async () => {
		const error = { code: 11000, keyPattern: { sourceRunId: 1 } };
		userModel.findOneAndUpdate.mockRejectedValue(error);

		await expect(
			registerGuest({
				userId: "guest-id",
				displayName: "Player",
				email: "player@example.com",
				password: "long-password",
			}),
		).rejects.toBe(error);
	});
});
