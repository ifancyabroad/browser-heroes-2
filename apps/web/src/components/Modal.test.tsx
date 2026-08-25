import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Modal } from "./Modal";

describe("Modal", () => {
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
