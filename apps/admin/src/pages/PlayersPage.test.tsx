import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const usePlayerMetrics = vi.hoisted(() => vi.fn());
vi.mock("../features/metrics", () => ({ usePlayerMetrics }));
vi.mock("react-router-dom", () => ({
	useOutletContext: () => ({
		filters: {
			from: "2026-06-01",
			to: "2026-06-07",
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
		Line: Wrapper,
		LineChart: Wrapper,
		ResponsiveContainer: Wrapper,
		Tooltip: Wrapper,
		XAxis: Wrapper,
		YAxis: Wrapper,
	};
});

import { PlayersPage } from "./PlayersPage";

describe("PlayersPage", () => {
	it("renders engagement, retention samples, and identity types", () => {
		usePlayerMetrics.mockReturnValue({
			isPending: false,
			isError: false,
			isFetching: false,
			data: {
				totals: {
					activePlayers: 12,
					newPlayers: 5,
					returningPlayers: 7,
					repeatPlayers: 4,
					runsStarted: 18,
					runsPerActivePlayer: 1.5,
				},
				daily: [],
				retention: [
					{ day: 1, eligiblePlayers: 5, returnedPlayers: 2, rate: 0.4 },
					{ day: 7, eligiblePlayers: 4, returnedPlayers: 1, rate: 0.25 },
					{ day: 30, eligiblePlayers: 2, returnedPlayers: 0, rate: 0 },
				],
				types: [
					{
						type: "guest",
						activePlayers: 8,
						newPlayers: 4,
						returningPlayers: 4,
						repeatPlayers: 2,
						runsStarted: 10,
						runsPerActivePlayer: 1.25,
					},
					{
						type: "registered",
						activePlayers: 4,
						newPlayers: 1,
						returningPlayers: 3,
						repeatPlayers: 2,
						runsStarted: 8,
						runsPerActivePlayer: 2,
					},
				],
			},
		});

		render(<PlayersPage />);

		expect(screen.getByText("Player engagement")).toBeInTheDocument();
		expect(screen.getByText("D1: 2 / 5")).toBeInTheDocument();
		const table = screen.getByRole("table");
		expect(within(table).getByText("Guest")).toBeInTheDocument();
		expect(within(table).getByText("Registered")).toBeInTheDocument();
	});
});
