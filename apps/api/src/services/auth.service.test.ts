import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

const userModel = vi.hoisted(() => ({
	create: vi.fn(),
	findById: vi.fn(),
}));

vi.mock("../models/user.model", () => ({ UserModel: userModel }));

import { createGuestUser, getUserById, toAuthUserView } from "./auth.service";
import { env } from "../config/env";

const originalAdminEmail = env.ADMIN_EMAIL;

describe("auth.service", () => {
	afterAll(() => {
		env.ADMIN_EMAIL = originalAdminEmail;
	});

	beforeEach(() => {
		vi.clearAllMocks();
		env.ADMIN_EMAIL = "admin@example.com";
	});

	it("creates a guest user with the expected type", async () => {
		const user = { _id: "user-id", type: "guest" };
		userModel.create.mockResolvedValue(user);

		await expect(createGuestUser()).resolves.toBe(user);
		expect(userModel.create).toHaveBeenCalledWith({ type: "guest" });
	});

	it("looks users up by id", async () => {
		const user = { _id: "user-id", type: "guest" };
		userModel.findById.mockReturnValue(user);

		await expect(getUserById("user-id")).resolves.toBe(user);
		expect(userModel.findById).toHaveBeenCalledWith("user-id");
	});

	it("projects all public authentication fields", () => {
		expect(
			toAuthUserView({
				_id: 42,
				type: "registered",
				displayName: "Test User",
				email: "admin@example.com",
			}),
		).toEqual({
			id: "42",
			type: "registered",
			displayName: "Test User",
			email: "admin@example.com",
			isAdmin: true,
		});
	});

	it("normalizes absent optional fields to null", () => {
		expect(toAuthUserView({ _id: "guest-id", type: "guest" })).toEqual({
			id: "guest-id",
			type: "guest",
			displayName: null,
			email: null,
			isAdmin: false,
		});
	});
});
