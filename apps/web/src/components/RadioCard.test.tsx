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

		fireEvent.click(selection);
		expect(selection).toBeChecked();
		expect(selection.parentElement).toBe(card);
	});
});
