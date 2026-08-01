import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContentImage } from "./ContentImage";

describe("ContentImage", () => {
	it("resolves content paths and displays a clear load failure", () => {
		render(<ContentImage path="skills/warlock/fireball.png" label="Fireball" />);
		const image = screen.getByRole("img", { name: "Fireball" });
		expect(image).toHaveAttribute("src", "/assets/images/skills/warlock/fireball.png");
		fireEvent.error(image);
		expect(
			screen.getByRole("img", { name: "Fireball: image unavailable" }),
		).toBeInTheDocument();
	});
});
