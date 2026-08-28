import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const useEnemyMetrics = vi.hoisted(() => vi.fn());
vi.mock("../features/metrics", () => ({ useEnemyMetrics }));
vi.mock("react-router-dom", () => ({
	useOutletContext: () => ({
		filters: {
			from: "2026-08-01",
			to: "2026-08-07",
			mode: "all",
		},
	}),
}));
vi.mock("recharts", () => {
	const Wrapper = ({ children }: { children?: React.ReactNode }) => <div>{children}</div>;
	return {
		Bar: Wrapper,
		BarChart: Wrapper,
		CartesianGrid: Wrapper,
		ResponsiveContainer: Wrapper,
		Tooltip: Wrapper,
		XAxis: Wrapper,
		YAxis: Wrapper,
	};
});

import { EnemiesPage } from "./EnemiesPage";

describe("EnemiesPage", () => {
	it("renders enemy metrics and sorts by the selected column", () => {
		useEnemyMetrics.mockReturnValue({
			isPending: false,
			isError: false,
			isFetching: false,
			data: {
				enemies: [
					{
						enemyId: "fire_beetle",
						encounterType: "standard",
						combats: 10,
						victories: 8,
						defeats: 2,
						winRate: 0.8,
						averageTurns: 2.5,
					},
					{
						enemyId: "ghost",
						encounterType: "ghost",
						combats: 5,
						victories: 2,
						defeats: 3,
						winRate: 0.4,
						averageTurns: 4,
					},
				],
			},
		});

		render(<EnemiesPage />);
		const table = screen.getByRole("table");
		expect(within(table).getAllByRole("row")[1]).toHaveTextContent("Fire Beetle");

		fireEvent.click(screen.getByRole("button", { name: "Avg. turns" }));
		expect(within(table).getAllByRole("row")[1]).toHaveTextContent("Ghost encounters");
	});
});
