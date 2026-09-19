import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GhostHistoryTable } from "./HistoryTables";

describe("GhostHistoryTable", () => {
	it.each(["active", "banished"] as const)("opens the source hero for a %s ghost", (status) => {
		const onSelectRun = vi.fn();
		render(
			<GhostHistoryTable
				sort="updatedAt"
				direction="desc"
				onSort={vi.fn()}
				onSelectRun={onSelectRun}
				entries={[
					{
						ghostId: "ghost-id",
						sourceRunId: "source-run-id",
						season: 1,
						name: "Echo",
						classId: "mage",
						heroLevel: 6,
						encounterLevel: 3,
						kills: 4,
						status,
						banishedBy: null,
						banishedAt: status === "banished" ? "2026-08-24T12:00:00.000Z" : null,
						createdAt: "2026-08-23T12:00:00.000Z",
						updatedAt: "2026-08-24T12:00:00.000Z",
					},
				]}
			/>,
		);
		const action = screen.getByRole("button", { name: "Inspect hero Echo" });
		fireEvent.click(action);
		expect(onSelectRun).toHaveBeenCalledExactlyOnceWith("source-run-id");
		onSelectRun.mockClear();
		fireEvent.click(action.closest("tr")!);
		expect(onSelectRun).toHaveBeenCalledExactlyOnceWith("source-run-id");
	});
});
