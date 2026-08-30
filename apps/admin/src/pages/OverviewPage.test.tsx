import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const context = vi.hoisted(() => ({ value: {} as unknown }));
const useOverview = vi.hoisted(() => vi.fn());
vi.mock("react-router-dom", () => ({ useOutletContext: () => context.value }));
vi.mock("../features/metrics", () => ({ useOverview }));
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

import { OverviewPage } from "./OverviewPage";

describe("OverviewPage", () => {
	it("renders aggregate metrics returned by the API", () => {
		context.value = {
			filters: { from: "2026-08-01", to: "2026-08-07", mode: "all" },
		};
		useOverview.mockReturnValue({
			isPending: false,
			isError: false,
			isFetching: false,
			data: {
				players: {
					active: { total: 12, guests: 9, registered: 3 },
					new: { total: 5, guests: 4, registered: 1 },
				},
				runs: {
					started: 18,
					outcomes: { active: 2, dead: 10, retired: 4, abandoned: 2 },
					finalBossCompletions: 3,
					finalBossCompletionRate: 1 / 6,
				},
				daily: [],
				progression: [],
			},
		});

		render(<OverviewPage />);
		expect(screen.getByText("12")).toBeInTheDocument();
		expect(screen.getByText("New identities")).toBeInTheDocument();
		expect(screen.getByText("9 guests · 3 registered")).toBeInTheDocument();
		expect(screen.getByText("16.7%")).toBeInTheDocument();
	});
});
