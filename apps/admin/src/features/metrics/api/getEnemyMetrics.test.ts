import { beforeEach, describe, expect, it, vi } from "vitest";
import { defaultEnemyMetricsFilters, type EnemyMetricsQuery } from "../types";

const mocks = vi.hoisted(() => ({ get: vi.fn(), json: vi.fn() }));
vi.mock("../../../lib/api", () => ({ api: { get: mocks.get } }));

import { getEnemyMetrics } from "./getEnemyMetrics";
import { toEnemyMetricsSearchParams } from "./toEnemyMetricsSearchParams";

const metricsFilters = {
	from: "2026-08-01",
	to: "2026-08-07",
	mode: "all",
} as const;

describe("getEnemyMetrics", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mocks.get.mockReturnValue({ json: mocks.json });
	});

	it("omits optional enemy filters when their all-values are selected", async () => {
		const query = { ...metricsFilters, ...defaultEnemyMetricsFilters };
		await getEnemyMetrics(query);

		expect(mocks.get).toHaveBeenCalledWith("admin/metrics/enemies", {
			searchParams: {
				from: "2026-08-01",
				to: "2026-08-07",
				minCombats: 1,
			},
			signal: undefined,
		});
	});

	it("serializes structured enemy filters", async () => {
		const query: EnemyMetricsQuery = {
			...metricsFilters,
			classId: "mage",
			encounterType: "boss",
			battleBand: "10-19",
			minCombats: 5,
		};
		await getEnemyMetrics(query);

		expect(mocks.get).toHaveBeenCalledWith(
			"admin/metrics/enemies",
			expect.objectContaining({
				searchParams: expect.objectContaining({
					classId: "mage",
					encounterType: "boss",
					battleFrom: 10,
					battleTo: 19,
					minCombats: 5,
				}),
			}),
		);
	});

	it("serializes the open-ended final battle band", () => {
		expect(
			toEnemyMetricsSearchParams({
				...metricsFilters,
				...defaultEnemyMetricsFilters,
				battleBand: "100+",
			}),
		).toEqual({
			from: "2026-08-01",
			to: "2026-08-07",
			battleFrom: 100,
			minCombats: 1,
		});
	});
});
