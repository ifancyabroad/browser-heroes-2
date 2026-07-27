import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

const authService = vi.hoisted(() => ({
	createGuestUser: vi.fn(),
	getUserById: vi.fn(),
	touchGuestActivity: vi.fn(),
	toAuthUserView: vi.fn((user: { _id: unknown; type: string }) => ({
		id: String(user._id),
		type: user.type,
		displayName: null,
		email: null,
	})),
}));

const accountService = vi.hoisted(() => ({
	registerGuest: vi.fn(),
	loginAccount: vi.fn(),
	requestPasswordReset: vi.fn(),
	resetPassword: vi.fn(),
}));

vi.mock("../services/auth.service", () => authService);
vi.mock("../services/account.service", () => accountService);

describe("auth routes", () => {
	let buildApp: typeof import("../app").buildApp;

	beforeAll(async () => {
		({ buildApp } = await import("../app"));
	});

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("creates a guest when no session exists", async () => {
		authService.createGuestUser.mockResolvedValue({ _id: "new-user", type: "guest" });

		const response = await request(buildApp()).post("/api/auth/guest").expect(201);

		expect(response.body).toEqual({
			user: {
				id: "new-user",
				type: "guest",
				displayName: null,
				email: null,
			},
		});
		expect(authService.createGuestUser).toHaveBeenCalledOnce();
	});

	it("reuses an existing session user", async () => {
		authService.getUserById.mockResolvedValue({ _id: "existing-user", type: "guest" });

		await request(buildApp())
			.post("/api/auth/guest")
			.set("x-test-user-id", "existing-user")
			.expect(200);

		expect(authService.getUserById).toHaveBeenCalledWith("existing-user");
		expect(authService.createGuestUser).not.toHaveBeenCalled();
	});

	it("returns null from /me without a session or when the user is missing", async () => {
		expect((await request(buildApp()).get("/api/auth/me").expect(200)).body).toEqual({
			user: null,
		});

		authService.getUserById.mockResolvedValue(null);
		expect(
			(
				await request(buildApp())
					.get("/api/auth/me")
					.set("x-test-user-id", "missing-user")
					.expect(200)
			).body,
		).toEqual({ user: null });
	});

	it("upgrades the current guest during registration", async () => {
		accountService.registerGuest.mockResolvedValue({
			_id: "guest-user",
			type: "registered",
			displayName: "Player",
			email: "player@example.com",
		});

		await request(buildApp())
			.post("/api/auth/register")
			.set("x-test-user-id", "guest-user")
			.send({
				displayName: "Player",
				email: "PLAYER@example.com",
				password: "long-password",
			})
			.expect(201);

		expect(accountService.registerGuest).toHaveBeenCalledWith({
			userId: "guest-user",
			displayName: "Player",
			email: "PLAYER@example.com",
			password: "long-password",
		});
	});

	it("switches directly to the registered account during login", async () => {
		accountService.loginAccount.mockResolvedValue({
			_id: "account-user",
			type: "registered",
			displayName: "Player",
			email: "player@example.com",
		});

		const response = await request(buildApp())
			.post("/api/auth/login")
			.set("x-test-user-id", "guest-user")
			.send({ email: "player@example.com", password: "long-password" })
			.expect(200);

		expect(response.body).toEqual({
			user: {
				id: "account-user",
				type: "registered",
				displayName: null,
				email: null,
			},
		});
		expect(accountService.loginAccount).toHaveBeenCalledWith({
			email: "player@example.com",
			password: "long-password",
		});
	});

	it("uses a generic forgot-password response", async () => {
		const response = await request(buildApp())
			.post("/api/auth/forgot-password")
			.send({ email: "unknown@example.com" })
			.expect(200);

		expect(response.body).toEqual({
			message: "If that account exists, a reset email has been sent.",
		});
	});
});
