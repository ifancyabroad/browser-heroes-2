import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ get: vi.fn(), json: vi.fn() }));
vi.mock("../../../lib/api", () => ({ api: { get: mocks.get } }));

import { getOverview } from "./getOverview";

describe("getOverview", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mocks.get.mockReturnValue({ json: mocks.json });
	});

	it("omits the all-mode UI sentinel from the API query", async () => {
		await getOverview({
			from: "2026-08-01",
			to: "2026-08-07",
			mode: "all",
		});

		expect(mocks.get).toHaveBeenCalledWith("admin/metrics/overview", {
			searchParams: { from: "2026-08-01", to: "2026-08-07" },
			signal: undefined,
		});
	});

	it("forwards a selected run mode", async () => {
		await getOverview({
			from: "2026-08-01",
			to: "2026-08-07",
			mode: "dailyChallenge",
		});

		expect(mocks.get).toHaveBeenCalledWith(
			"admin/metrics/overview",
			expect.objectContaining({
				searchParams: expect.objectContaining({ mode: "dailyChallenge" }),
			}),
		);
	});
});
