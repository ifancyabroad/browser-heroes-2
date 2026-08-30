import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const useSkillMetrics = vi.hoisted(() => vi.fn());
vi.mock("../features/metrics", () => ({ useSkillMetrics }));
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

import { SkillsPage } from "./SkillsPage";

describe("SkillsPage", () => {
	it("renders skill metrics and sorts by the selected column", () => {
		useSkillMetrics.mockReturnValue({
			isPending: false,
			isError: false,
			isFetching: false,
			data: {
				skills: [
					{
						skillId: "armour_break",
						uses: 10,
						usageShare: 0.6,
						runs: 5,
						combats: 8,
						averageUsesPerRun: 2,
						averageBattle: 7,
						averageTurn: 2.5,
						resolvedCombats: 8,
						combatWins: 6,
						combatWinRate: 0.75,
					},
					{
						skillId: "taunt",
						uses: 5,
						usageShare: 0.35,
						runs: 4,
						combats: 5,
						averageUsesPerRun: 1.25,
						averageBattle: 12,
						averageTurn: 3,
						resolvedCombats: 5,
						combatWins: 2,
						combatWinRate: 0.4,
					},
					{
						skillId: "retired_skill",
						uses: 1,
						usageShare: 0.05,
						runs: 1,
						combats: 1,
						averageUsesPerRun: 1,
						averageBattle: 1,
						averageTurn: 1,
						resolvedCombats: 1,
						combatWins: 1,
						combatWinRate: 1,
					},
				],
			},
		});

		render(<SkillsPage />);
		expect(useSkillMetrics).toHaveBeenCalledWith(
			{
				from: "2026-08-01",
				to: "2026-08-07",
				mode: "all",
			},
			{ classId: "" },
		);
		const table = screen.getByRole("table");
		expect(within(table).getAllByRole("row")[1]).toHaveTextContent("Armour Break");
		expect(
			within(table).getByText("retired_skill", { selector: "strong" }),
		).toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: "Avg. battle" }));
		expect(within(table).getAllByRole("row")[1]).toHaveTextContent("Taunt");

		fireEvent.change(screen.getByLabelText("Search skills"), {
			target: { value: "armour" },
		});
		expect(within(table).getAllByRole("row")).toHaveLength(2);
		expect(within(table).queryByText("Taunt")).not.toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "Usage share" })).toBeInTheDocument();
	});
});
