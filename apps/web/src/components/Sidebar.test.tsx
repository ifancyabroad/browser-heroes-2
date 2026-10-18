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
	it("uses a modal drawer on mobile and one permanent panel on desktop", async () => {
		let desktop = false;
		const listeners = new Set<(event: MediaQueryListEvent) => void>();
		const media = window.matchMedia("(min-width: 1280px)");
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
