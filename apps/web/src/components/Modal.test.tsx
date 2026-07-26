import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Modal } from "./Modal";

describe("Modal", () => {
	it("uses the medium size by default", () => {
		render(
			<Modal open title="Default modal" onClose={() => undefined}>
				Content
			</Modal>,
		);

		expect(screen.getByRole("dialog")).toHaveClass("max-w-md");
	});

	it("selects one explicit width class for larger modals", () => {
		render(
			<Modal open title="Large modal" size="xl" onClose={() => undefined}>
				Content
			</Modal>,
		);

		const dialog = screen.getByRole("dialog");
		expect(dialog).toHaveClass("max-w-5xl");
		expect(dialog).not.toHaveClass("max-w-md");
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
