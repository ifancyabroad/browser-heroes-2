import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

const authService = vi.hoisted(() => ({
	createGuestUser: vi.fn(),
	getUserById: vi.fn(),
	toAuthUserView: vi.fn((user: { _id: unknown; type: string }) => ({
		id: String(user._id),
		type: user.type,
		displayName: null,
		email: null,
	})),
}));

vi.mock("../services/auth.service", () => authService);

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
});
