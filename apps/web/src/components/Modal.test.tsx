import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { Modal } from "./Modal";

describe("Modal", () => {
	it.each([
		{ action: "cancellation", disableOpener: false },
		{ action: "purchase completion", disableOpener: true },
	])("restores focus after nested modal $action", async ({ disableOpener }) => {
		function Example() {
			const [childOpen, setChildOpen] = useState(false);
			const [purchased, setPurchased] = useState(false);
			return (
				<>
					<Modal open title="Shop" onClose={() => undefined}>
						<button disabled={purchased} onClick={() => setChildOpen(true)}>
							Buy
						</button>
					</Modal>
					{childOpen && (
						<Modal
							open
							title="Replacement"
							onClose={() => setChildOpen(false)}
							footer={
								<button
									onClick={() => {
										setPurchased(disableOpener);
										setChildOpen(false);
									}}
								>
									Finish
								</button>
							}
						/>
					)}
				</>
			);
		}
		render(<Example />);
		const shop = screen.getByRole("dialog", { name: "Shop" });
		const buy = within(shop).getByRole("button", { name: "Buy" });
		buy.focus();
		fireEvent.click(buy);
		expect(screen.getByRole("dialog", { name: "Replacement" })).toHaveFocus();
		fireEvent.click(screen.getByRole("button", { name: "Finish" }));
		await waitFor(() => expect(disableOpener ? shop : buy).toHaveFocus());
	});
	it("restores focus to the opener when closed", async () => {
		function Example() {
			const [open, setOpen] = useState(false);
			return (
				<>
					<button onClick={() => setOpen(true)}>Open modal</button>
					<Modal
						open={open}
						title="Example"
						onClose={() => setOpen(false)}
						footer={<button onClick={() => setOpen(false)}>Close</button>}
					/>
				</>
			);
		}
		render(<Example />);
		const opener = screen.getByRole("button", { name: "Open modal" });
		opener.focus();
		fireEvent.click(opener);
		fireEvent.click(screen.getByRole("button", { name: "Close" }));
		await waitFor(() => expect(opener).toHaveFocus());
	});
	it("focuses the dialog instead of its first interactive child when opened", () => {
		render(
			<Modal open title="Focus modal" onClose={() => undefined}>
				<button type="button">First action</button>
			</Modal>,
		);

		const dialog = screen.getByRole("dialog");
		expect(dialog).toHaveFocus();
		expect(screen.getByRole("button", { name: "First action" })).not.toHaveFocus();
	});
});
