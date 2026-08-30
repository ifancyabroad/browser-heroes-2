import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const useClassMetrics = vi.hoisted(() => vi.fn());
vi.mock("../features/metrics", () => ({ useClassMetrics }));
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

import { ClassesPage } from "./ClassesPage";

describe("ClassesPage", () => {
	it("renders class metrics and sorts by the selected column", () => {
		useClassMetrics.mockReturnValue({
			isPending: false,
			isError: false,
			isFetching: false,
			data: {
				classes: [
					{
						classId: "warrior",
						runsStarted: 10,
						pickRate: 0.4,
						active: 1,
						dead: 5,
						retired: 3,
						abandoned: 1,
						terminalRuns: 8,
						deathRate: 0.625,
						finalBossCompletions: 2,
						finalBossCompletionRate: 0.2,
						averageBattleReached: 20,
						averageKills: 18,
					},
					{
						classId: "mage",
						runsStarted: 8,
						pickRate: 0.6,
						active: 2,
						dead: 3,
						retired: 2,
						abandoned: 1,
						terminalRuns: 5,
						deathRate: 0.6,
						finalBossCompletions: 1,
						finalBossCompletionRate: 0.125,
						averageBattleReached: 18,
						averageKills: 15,
					},
				],
			},
		});

		render(<ClassesPage />);
		expect(screen.getByRole("heading", { name: "Average battle reached" })).toBeInTheDocument();
		const table = screen.getByRole("table");
		expect(within(table).getAllByRole("row")[1]).toHaveTextContent("Warrior");

		fireEvent.click(screen.getByRole("button", { name: "Pick rate" }));
		expect(within(table).getAllByRole("row")[1]).toHaveTextContent("Mage");
	});
});
