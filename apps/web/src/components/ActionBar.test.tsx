import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ActionBarGroup, ActionBarTray } from "./ActionBar";

describe("ActionBar layout", () => {
	it("lays out children from every semantic group in one wrapping tray", () => {
		render(
			<ActionBarTray>
				<ActionBarGroup aria-label="Resources">
					<button type="button">Gold</button>
				</ActionBarGroup>
				<ActionBarGroup aria-label="Actions">
					<button type="button">Attack</button>
				</ActionBarGroup>
			</ActionBarTray>,
		);

		const resources = screen.getByRole("group", { name: "Resources" });
		const actions = screen.getByRole("group", { name: "Actions" });
		const tray = resources.parentElement;

		expect(tray).toHaveClass(
			"flex",
			"w-full",
			"flex-wrap",
			"justify-center",
			"gap-1",
			"sm:gap-2",
		);
		expect(tray).not.toHaveClass("bg-bg-elevated", "p-2");
		expect(resources).toHaveClass("contents");
		expect(actions).toHaveClass("contents");
		expect(actions.parentElement).toBe(tray);
	});
});
