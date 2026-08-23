import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AbandonRunModal } from "./AbandonRunModal";

describe("AbandonRunModal", () => {
	it("explains the permanent consequence and exposes both decisions", () => {
		const onClose = vi.fn();
		const onConfirm = vi.fn();

		render(<AbandonRunModal heroName="Ada" onClose={onClose} onConfirm={onConfirm} />);

		expect(screen.getByRole("dialog", { name: "ABANDON CURRENT RUN?" })).toHaveTextContent(
			"Starting a new run will permanently abandon your current run with Ada. This cannot be undone.",
		);

		fireEvent.click(screen.getByRole("button", { name: "CANCEL" }));
		expect(onClose).toHaveBeenCalledOnce();

		fireEvent.click(screen.getByRole("button", { name: "ABANDON RUN" }));
		expect(onConfirm).toHaveBeenCalledOnce();
	});
});
