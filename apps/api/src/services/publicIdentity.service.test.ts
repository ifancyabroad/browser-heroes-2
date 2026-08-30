import { beforeEach, describe, expect, it, vi } from "vitest";

const users = vi.hoisted(() => ({ find: vi.fn() }));
vi.mock("../models/user.model", () => ({ UserModel: users }));

import { getRegisteredDisplayNames } from "./publicIdentity.service";

describe("getRegisteredDisplayNames", () => {
	beforeEach(() => vi.clearAllMocks());

	it("returns no names without querying when there are no owners", async () => {
		await expect(getRegisteredDisplayNames([])).resolves.toEqual(new Map());
		expect(users.find).not.toHaveBeenCalled();
	});

	it("deduplicates owners and returns only non-empty registered display names", async () => {
		const lean = vi.fn().mockResolvedValue([
			{ _id: "user-one", displayName: " Player One " },
			{ _id: "user-two", displayName: "   " },
		]);
		const select = vi.fn().mockReturnValue({ lean });
		users.find.mockReturnValue({ select });

		await expect(
			getRegisteredDisplayNames(["user-one", "user-one", "user-two", null]),
		).resolves.toEqual(new Map([["user-one", "Player One"]]));
		expect(users.find).toHaveBeenCalledWith({
			_id: { $in: ["user-one", "user-two"] },
			type: "registered",
		});
		expect(select).toHaveBeenCalledWith("_id displayName");
	});
});
