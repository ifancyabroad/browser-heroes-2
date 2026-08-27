import type { ChallengeEntryView } from "@app/shared";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DailyChallengeLeaderboardTable } from "./DailyChallengeLeaderboardTable";

const currentUserEntry: ChallengeEntryView = {
	rank: 42,
	runId: "current-run",
	heroName: "Pinned Hero",
	classId: "warrior",
	level: 4,
	battleNumber: 9,
	zoneNumber: 2,
	endlessCycle: 0,
	day: 3,
	kills: 8,
	status: "dead",
	slainBy: null,
	completedAt: "2026-08-23T12:00:00.000Z",
	isCurrentUser: true,
};

describe("DailyChallengeLeaderboardTable", () => {
	it("renders the current user's result above the paginated entries", () => {
		render(
			<DailyChallengeLeaderboardTable
				currentUserEntry={currentUserEntry}
				entries={[{ ...currentUserEntry, runId: "leader-run", isCurrentUser: false }]}
				onSelectRun={vi.fn()}
			/>,
		);

		const rows = screen.getAllByRole("row");
		const heroButtons = screen.getAllByRole("button", { name: "Inspect hero Pinned Hero" });
		const pinnedRow = heroButtons[0]!.closest("tr");
		const leaderboardRow = heroButtons[1]!.closest("tr");

		expect(pinnedRow).not.toBeNull();
		expect(rows[1]).toBe(pinnedRow);
		expect(rows.indexOf(pinnedRow!)).toBeLessThan(rows.indexOf(leaderboardRow!));
		expect(within(pinnedRow!).getByText("42")).toBeInTheDocument();
		expect(within(pinnedRow!).getByText("YOU")).toBeInTheDocument();
		expect(pinnedRow).toHaveClass("border-b-2");
	});

	it("keeps both copies when the user's natural row is on the page", () => {
		render(
			<DailyChallengeLeaderboardTable
				currentUserEntry={currentUserEntry}
				entries={[currentUserEntry]}
				onSelectRun={vi.fn()}
			/>,
		);

		expect(screen.getAllByRole("button", { name: "Inspect hero Pinned Hero" })).toHaveLength(2);
	});

	it("opens the hero dossier from the pinned result", () => {
		const onSelectRun = vi.fn();
		render(
			<DailyChallengeLeaderboardTable
				currentUserEntry={currentUserEntry}
				entries={[]}
				onSelectRun={onSelectRun}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Inspect hero Pinned Hero" }));
		expect(onSelectRun).toHaveBeenCalledWith("current-run");
	});

	it("renders without a pinned section when there is no completed result", () => {
		render(
			<DailyChallengeLeaderboardTable
				currentUserEntry={null}
				entries={[{ ...currentUserEntry, isCurrentUser: false }]}
				onSelectRun={vi.fn()}
			/>,
		);

		expect(screen.getAllByRole("row")).toHaveLength(2);
	});
});
