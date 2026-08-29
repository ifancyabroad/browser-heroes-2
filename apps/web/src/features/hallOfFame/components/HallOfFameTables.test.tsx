import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GhostHallOfFameTable, HeroHallOfFameTable } from "./HallOfFameTables";

describe("HeroHallOfFameTable", () => {
	it("marks Daily Challenge heroes, highlights ownership, and opens dossiers", () => {
		const onSelectRun = vi.fn();
		render(
			<HeroHallOfFameTable
				onSelectRun={onSelectRun}
				entries={[
					{
						rank: 4,
						runId: "run-id",
						heroName: "Ada",
						classId: "mage",
						level: 8,
						zoneNumber: 4,
						day: 3,
						kills: 31,
						status: "dead",
						mode: "dailyChallenge",
						slainBy: null,
						completedAt: "2026-08-23T12:00:00.000Z",
						isCurrentUser: true,
					},
				]}
			/>,
		);

		expect(screen.getByLabelText("Daily Challenge")).toBeInTheDocument();
		expect(screen.getByText("YOU")).toBeInTheDocument();
		const row = screen.getByRole("button", { name: "Inspect hero Ada" }).closest("tr");
		expect(row).toHaveClass("bg-bg-panel");
		fireEvent.click(screen.getByRole("button", { name: "Inspect hero Ada" }));
		expect(onSelectRun).toHaveBeenCalledWith("run-id");
	});

	it("marks the current user's ghosts", () => {
		render(
			<GhostHallOfFameTable
				entries={[
					{
						rank: 2,
						ghostId: "ghost-id",
						name: "Echo",
						classId: "mage",
						heroLevel: 6,
						kills: 4,
						deaths: 1,
						encounters: 5,
						winRate: 0.8,
						isCurrentUser: true,
					},
				]}
			/>,
		);

		expect(screen.getByText("YOU")).toBeInTheDocument();
	});
});
