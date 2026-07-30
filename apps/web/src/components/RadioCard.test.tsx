import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { RadioGroup } from "radix-ui";
import { describe, expect, it } from "vitest";
import { RadioCard } from "./RadioCard";

function RadioCardHarness() {
	const [value, setValue] = useState("");

	return (
		<RadioGroup.Root value={value} onValueChange={setValue}>
			<RadioCard value="choice" selected={value === "choice"} selectionLabel="Select choice">
				<span>Choice details</span>
			</RadioCard>
		</RadioGroup.Root>
	);
}

describe("RadioCard", () => {
	it("separates card content from its radio selection control", () => {
		render(<RadioCardHarness />);

		const selection = screen.getByRole("radio", { name: "Select choice" });
		const card = selection.parentElement;

		fireEvent.click(screen.getByText("Choice details"));
		expect(selection).not.toBeChecked();
		expect(card).not.toHaveClass("border-primary");

		fireEvent.click(selection);
		expect(selection).toBeChecked();
		expect(card).toHaveClass("border-primary");
		expect(selection.firstElementChild).toHaveClass("border-border", "bg-transparent");
		expect(selection.firstElementChild?.firstElementChild).toHaveClass("bg-primary");
	});
});
