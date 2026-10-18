import { useState } from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Sidebar } from "./Sidebar";

function Example() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<button onClick={() => setOpen(true)}>Open world</button>
			<Sidebar
				open={open}
				onClose={() => setOpen(false)}
				side="right"
				className="border-border-secondary"
				aria-label="World log"
			>
				<button>Feed action</button>
			</Sidebar>
		</>
	);
}

describe("Sidebar", () => {
	it.each([
		{ width: 1023, heroVisible: false, worldVisible: false },
		{ width: 1024, heroVisible: true, worldVisible: false },
		{ width: 1663, heroVisible: true, worldVisible: false },
		{ width: 1664, heroVisible: true, worldVisible: true },
	])(
		"shows the correct permanent panels at $width px",
		({ width, heroVisible, worldVisible }) => {
			const media = window.matchMedia("");
			vi.mocked(window.matchMedia).mockImplementation((query) => ({
				...media,
				media: query,
				matches: width >= Number(query.match(/min-width: (\d+)px/)?.[1] ?? Infinity),
			}));
			render(
				<>
					<Sidebar open={false} onClose={vi.fn()} aria-label="Hero">
						Hero details
					</Sidebar>
					<Sidebar open={false} onClose={vi.fn()} side="right" aria-label="World log">
						World events
					</Sidebar>
				</>,
			);
			expect(screen.queryByRole("complementary", { name: "Hero" }) !== null).toBe(
				heroVisible,
			);
			expect(screen.queryByRole("complementary", { name: "World log" }) !== null).toBe(
				worldVisible,
			);
		},
	);

	it("uses a modal drawer on mobile and one permanent panel on desktop", async () => {
		let desktop = false;
		const listeners = new Set<(event: MediaQueryListEvent) => void>();
		const media = window.matchMedia("(min-width: 1664px)");
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
		const trigger = screen.getByRole("button", { name: "Open world" });
		trigger.focus();
		fireEvent.click(trigger);
		expect(screen.getByRole("dialog", { name: "World log" })).toHaveClass(
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
		expect(screen.getByRole("complementary", { name: "World log" })).toHaveClass(
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
