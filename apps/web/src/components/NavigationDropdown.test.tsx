import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { NavigationDropdown } from "./NavigationDropdown";

const items = [
	{ label: "PROGRESS", to: "/progress", end: false },
	{ label: "HISTORY", to: "/history", end: false },
	{ label: "BESTIARY", to: "/bestiary", end: false },
];

function renderDropdown() {
	return render(
		<MemoryRouter>
			<NavigationDropdown label="JOURNAL" items={items} />
		</MemoryRouter>,
	);
}

describe("NavigationDropdown", () => {
	it("opens on activation, highlights its active page, and closes after navigation", () => {
		renderDropdown();
		const journal = screen.getByRole("button", { name: "JOURNAL" });
		fireEvent.mouseOver(journal);
		expect(journal).toHaveAttribute("aria-expanded", "false");
		expect(screen.queryByRole("menuitem", { name: "PROGRESS" })).not.toBeInTheDocument();
		fireEvent.keyDown(journal, { key: "Enter" });
		for (const [name, path] of [
			["PROGRESS", "/progress"],
			["HISTORY", "/history"],
			["BESTIARY", "/bestiary"],
		]) {
			expect(screen.getByRole("menuitem", { name })).toHaveAttribute("href", path);
		}
		fireEvent.click(screen.getByRole("menuitem", { name: "BESTIARY" }));
		expect(journal).toHaveAttribute("aria-expanded", "false");
		expect(journal).toHaveClass("border-primary");
		fireEvent.keyDown(journal, { key: "Enter" });
		expect(screen.getByRole("menuitem", { name: "BESTIARY" })).toHaveAttribute(
			"aria-current",
			"page",
		);
	});

	it("supports arrow keys and restores trigger focus after Escape", async () => {
		renderDropdown();
		const journal = screen.getByRole("button", { name: "JOURNAL" });
		fireEvent.keyDown(journal, { key: "ArrowDown" });
		await waitFor(() =>
			expect(screen.getByRole("menuitem", { name: "PROGRESS" })).toHaveFocus(),
		);
		fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" });
		await waitFor(() =>
			expect(screen.getByRole("menuitem", { name: "HISTORY" })).toHaveFocus(),
		);
		fireEvent.keyDown(document.activeElement!, { key: "Escape" });
		await waitFor(() => expect(journal).toHaveFocus());
		expect(journal).toHaveAttribute("aria-expanded", "false");
	});

	it("closes on mobile and stays closed when returning to desktop", () => {
		const changes = new EventTarget();
		const media = window.matchMedia("(min-width: 48rem)");
		vi.mocked(window.matchMedia).mockReturnValue({
			...media,
			addEventListener: changes.addEventListener.bind(changes),
			removeEventListener: changes.removeEventListener.bind(changes),
		});
		renderDropdown();
		const journal = screen.getByRole("button", { name: "JOURNAL" });
		fireEvent.keyDown(journal, { key: "Enter" });
		expect(screen.getByRole("menu")).toBeInTheDocument();

		act(() => {
			changes.dispatchEvent(Object.assign(new Event("change"), { matches: false }));
		});
		expect(journal).toHaveAttribute("aria-expanded", "false");
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();

		act(() => {
			changes.dispatchEvent(Object.assign(new Event("change"), { matches: true }));
		});
		expect(journal).toHaveAttribute("aria-expanded", "false");
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
	});
});
