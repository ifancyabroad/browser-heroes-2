import { beforeEach, describe, expect, it, vi } from "vitest";
import { getSkillMetrics } from "./getSkillMetrics";

const mocks = vi.hoisted(() => ({ get: vi.fn(), json: vi.fn() }));
vi.mock("../../../lib/api", () => ({ api: { get: mocks.get } }));

describe("getSkillMetrics", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mocks.get.mockReturnValue({ json: mocks.json });
	});

	it("serializes the class filter", async () => {
		await getSkillMetrics({
			from: "2026-08-01",
			to: "2026-08-07",
			mode: "all",
			classId: "mage",
		});

		expect(mocks.get).toHaveBeenCalledWith("admin/metrics/skills", {
			searchParams: {
				from: "2026-08-01",
				to: "2026-08-07",
				classId: "mage",
			},
			signal: undefined,
		});
	});
});
