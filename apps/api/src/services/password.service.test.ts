import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password.service";

describe("password.service", () => {
	it("stores an Argon2id hash and verifies only the original password", async () => {
		const hash = await hashPassword("a-secure-password");

		expect(hash).toMatch(/^\$argon2id\$/);
		await expect(verifyPassword(hash, "a-secure-password")).resolves.toBe(true);
		await expect(verifyPassword(hash, "a-different-password")).resolves.toBe(false);
	});
});
