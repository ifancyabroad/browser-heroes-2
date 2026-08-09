import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
	it("shows the copyright and coffee support link", () => {
		render(<Footer />);

		expect(
			screen.getByText(new RegExp(`${new Date().getFullYear()} Browser Heroes`)),
		).toBeVisible();
		expect(screen.getByRole("link", { name: "Buy me a coffee" })).toHaveAttribute(
			"href",
			"https://buymeacoffee.com/durfu",
		);
	});
});
