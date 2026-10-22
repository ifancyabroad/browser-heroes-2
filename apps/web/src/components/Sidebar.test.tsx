import { useState } from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Sidebar } from "./Sidebar";

function Example() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<button onClick={() => setOpen(true)}>Open hero</button>
			<Sidebar
				open={open}
				onClose={() => setOpen(false)}
				className="border-border-secondary"
				aria-label="Hero details"
			>
				<button>Feed action</button>
			</Sidebar>
		</>
	);
}

describe("Sidebar", () => {
	it.each([
		{ width: 1023, visible: false },
		{ width: 1024, visible: true },
		{ width: 1536, visible: true },
	])("shows the permanent hero panel at $width px: $visible", ({ width, visible }) => {
		const media = window.matchMedia("");
		vi.mocked(window.matchMedia).mockImplementation((query) => ({
			...media,
			media: query,
			matches: width >= 1024,
		}));
		render(
			<Sidebar open={false} onClose={vi.fn()} aria-label="Hero">
				Hero details
			</Sidebar>,
		);
		expect(screen.queryByRole("complementary", { name: "Hero" }) !== null).toBe(visible);
	});

	it("uses a modal drawer on mobile and one permanent panel on desktop", async () => {
		let desktop = false;
		const listeners = new Set<(event: MediaQueryListEvent) => void>();
		const media = window.matchMedia("(min-width: 1024px)");
		vi.mocked(window.matchMedia).mockImplementation(
			(query) =>
				({
					...media,
					media: query,
					get matches() {
						return desktop;
					},
					addEventListener: (
						_event: string,
						listener: (event: MediaQueryListEvent) => void,
					) => listeners.add(listener),
					removeEventListener: (
						_event: string,
						listener: (event: MediaQueryListEvent) => void,
					) => listeners.delete(listener),
				}) as MediaQueryList,
		);
		render(<Example />);
		expect(screen.queryByText("Feed action")).not.toBeInTheDocument();
		const trigger = screen.getByRole("button", { name: "Open hero" });
		trigger.focus();
		fireEvent.click(trigger);
		expect(screen.getByRole("dialog", { name: "Hero details" })).toHaveClass(
			"border-border-secondary",
		);
		expect(screen.getByRole("button", { name: "Close sidebar" })).toHaveFocus();
		fireEvent.keyDown(document.activeElement!, { key: "Tab", shiftKey: true });
		expect(screen.getByRole("button", { name: "Feed action" })).toHaveFocus();
		fireEvent.keyDown(document.activeElement!, { key: "Escape" });
		await waitFor(() => expect(trigger).toHaveFocus());
		fireEvent.click(trigger);
		act(() => {
			desktop = true;
			listeners.forEach((listener) => listener({ matches: desktop } as MediaQueryListEvent));
		});
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		expect(screen.getByRole("complementary", { name: "Hero details" })).toHaveClass(
			"border-border-secondary",
		);
		expect(screen.getAllByText("Feed action")).toHaveLength(1);
		act(() => {
			desktop = false;
			listeners.forEach((listener) => listener({ matches: desktop } as MediaQueryListEvent));
		});
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});
});
