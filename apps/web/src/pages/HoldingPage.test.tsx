import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HoldingPage } from "./HoldingPage";

describe("HoldingPage", () => {
	it("shows the branded coming soon message without public controls", () => {
		render(<HoldingPage />);

		expect(screen.getByRole("img", { name: "Browser Heroes" })).toBeInTheDocument();
		expect(screen.getByText("COMING SOON")).toBeInTheDocument();
		expect(screen.queryByRole("link")).not.toBeInTheDocument();
		expect(screen.queryByRole("button")).not.toBeInTheDocument();
	});
});
