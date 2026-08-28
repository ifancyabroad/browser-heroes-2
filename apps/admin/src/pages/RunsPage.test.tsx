import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const useRunMetrics = vi.hoisted(() => vi.fn());
vi.mock("../features/metrics", () => ({ useRunMetrics }));
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
		Legend: Wrapper,
		ResponsiveContainer: Wrapper,
		Tooltip: Wrapper,
		XAxis: Wrapper,
		YAxis: Wrapper,
	};
});

import { RunsPage } from "./RunsPage";

describe("RunsPage", () => {
	it("renders run totals and mode metrics", () => {
		useRunMetrics.mockReturnValue({
			isPending: false,
			isError: false,
			isFetching: false,
			data: {
				totals: {
					runsStarted: 10,
					active: 2,
					dead: 4,
					retired: 2,
					abandoned: 2,
					resolvedRuns: 6,
					abandonmentRate: 0.2,
					averageBattleReached: 18.5,
					averageKills: 15.2,
					finalBossCompletions: 1,
					finalBossCompletionRate: 0.1,
				},
				daily: [],
				depth: [],
				modes: [
					{
						mode: "normal",
						runsStarted: 8,
						share: 0.8,
						active: 2,
						dead: 3,
						retired: 1,
						abandoned: 2,
						averageBattleReached: 15,
						averageKills: 12,
						finalBossCompletions: 0,
						finalBossCompletionRate: 0,
					},
					{
						mode: "dailyChallenge",
						runsStarted: 2,
						share: 0.2,
						active: 0,
						dead: 1,
						retired: 1,
						abandoned: 0,
						averageBattleReached: 32.5,
						averageKills: 28,
						finalBossCompletions: 1,
						finalBossCompletionRate: 0.5,
					},
				],
			},
		});

		render(<RunsPage />);

		expect(screen.getByText("Run performance")).toBeInTheDocument();
		expect(screen.getByText("Abandonment rate").closest("article")).toHaveTextContent("20%");
		const table = screen.getByRole("table");
		expect(within(table).getByText("Normal")).toBeInTheDocument();
		expect(within(table).getByText("Daily challenge")).toBeInTheDocument();
		expect(within(table).getByText("50%")).toBeInTheDocument();
	});
});
