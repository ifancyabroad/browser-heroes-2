import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useHowToPlayModalStore } from "../stores/howToPlayModalStore";
import { HowToPlayModal } from "./HowToPlayModal";

describe("HowToPlayModal", () => {
	beforeEach(() => {
		useHowToPlayModalStore.setState({ isOpen: true });
	});

	it("dismisses the guide from its action", () => {
		render(<HowToPlayModal />);

		fireEvent.click(screen.getByRole("button", { name: "Close" }));

		expect(useHowToPlayModalStore.getState().isOpen).toBe(false);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});
});
