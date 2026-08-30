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
			battleBand: "11-20",
			minCombats: 5,
		};
		await getEnemyMetrics(query);

		expect(mocks.get).toHaveBeenCalledWith(
			"admin/metrics/enemies",
			expect.objectContaining({
				searchParams: expect.objectContaining({
					classId: "mage",
					encounterType: "boss",
					battleFrom: 11,
					battleTo: 20,
					minCombats: 5,
				}),
			}),
		);
	});

	it("serializes a bounded battle band", () => {
		expect(
			toEnemyMetricsSearchParams({
				...metricsFilters,
				...defaultEnemyMetricsFilters,
				battleBand: "1-10",
			}),
		).toEqual({
			from: "2026-08-01",
			to: "2026-08-07",
			battleFrom: 1,
			battleTo: 10,
			minCombats: 1,
		});
	});

	it("serializes the final battle band as an open-ended range", () => {
		expect(
			toEnemyMetricsSearchParams({
				...metricsFilters,
				...defaultEnemyMetricsFilters,
				battleBand: "101+",
			}),
		).toEqual({
			from: "2026-08-01",
			to: "2026-08-07",
			battleFrom: 101,
			minCombats: 1,
		});
	});
});
