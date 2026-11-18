import { fireEvent, render, screen } from "@testing-library/react";
import type { WorldLogEntry } from "@app/shared";
import { describe, expect, it } from "vitest";
import { WorldLogPanel } from "./WorldLogPanel";

function entry(id: string, heroName: string): WorldLogEntry {
	return {
		id,
		createdAt: "2026-01-01T00:00:00.000Z",
		heroName,
		classId: "warrior",
		mode: "normal",
		displayName: null,
		event: { type: "hero_created" },
	};
}

describe("WorldLogPanel", () => {
	it("shows only the latest arrival until expanded, then follows new arrivals when collapsed", () => {
		const entries = [entry("1", "Mira"), entry("2", "Aldric")];
		const view = render(<WorldLogPanel entries={entries} pending={false} error={false} />);
		expect(screen.getByText("Aldric the Warrior")).toBeInTheDocument();
		expect(screen.queryByText("Mira the Warrior")).not.toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "Expand world log" }));
		expect(screen.getByText("Mira the Warrior")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Collapse world log" })).toHaveAttribute(
			"aria-expanded",
			"true",
		);
		fireEvent.click(screen.getByRole("button", { name: "Collapse world log" }));
		view.rerender(
			<WorldLogPanel
				entries={[...entries, entry("3", "Rowan")]}
				pending={false}
				error={false}
			/>,
		);
		expect(screen.getByText("Rowan the Warrior")).toBeInTheDocument();
		expect(screen.queryByText("Aldric the Warrior")).not.toBeInTheDocument();
	});

	it("keeps existing activity visible when a refresh fails", () => {
		render(<WorldLogPanel entries={[entry("1", "Mira")]} pending={false} error />);
		expect(screen.getByText("Mira the Warrior")).toBeInTheDocument();
		expect(screen.queryByText("World log unavailable.")).not.toBeInTheDocument();
	});
});
