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
						displayName: "Player",
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

		const challengeMarker = screen.getByLabelText("Daily Challenge");
		expect(challengeMarker.parentElement).toHaveClass("absolute");
		expect(challengeMarker.parentElement).not.toHaveClass("bg-bg-base");
		expect(screen.getByText("Ada")).toHaveClass("text-primary");
		expect(screen.getByText(/\(Player\)/)).toHaveClass("text-info");
		expect(screen.queryByText("YOU")).not.toBeInTheDocument();
		const row = screen
			.getByRole("button", { name: "Inspect hero Ada owned by Player" })
			.closest("tr");
		expect(row).toHaveClass("bg-bg-panel");
		fireEvent.click(screen.getByRole("button", { name: "Inspect hero Ada owned by Player" }));
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
						displayName: null,
						classId: "mage",
						heroLevel: 6,
						kills: 4,
						status: "banished",
						banishedBy: {
							sourceId: "banisher-run-id",
							heroName: "Dawn",
							classId: "priest",
							heroLevel: 7,
						},
						isCurrentUser: true,
					},
				]}
			/>,
		);

		expect(screen.getByText("Echo")).toHaveClass("text-primary");
		expect(screen.queryByText("YOU")).not.toBeInTheDocument();
		expect(screen.queryByText("(Player)")).not.toBeInTheDocument();
		expect(screen.getByText("Dawn the Priest")).toBeInTheDocument();
	});
});
