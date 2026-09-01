import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TownGoldBalance } from "./TownGoldBalance";

describe("TownGoldBalance", () => {
	it("displays the current gold balance", () => {
		render(<TownGoldBalance gold={1250} />);

		expect(screen.getByLabelText("1250 gold")).toHaveTextContent("1250");
	});
});
