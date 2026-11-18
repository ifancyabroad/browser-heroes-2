import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GoldBalance } from "./GoldBalance";

describe("GoldBalance", () => {
	it("displays the current gold balance", () => {
		render(<GoldBalance gold={1250} />);

		expect(screen.getByLabelText("1250 gold")).toHaveTextContent("1250");
	});
});
