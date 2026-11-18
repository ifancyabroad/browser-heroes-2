import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useGameModalStore, HOW_TO_PLAY_SEEN_STORAGE_KEY } from "../../../stores/gameModalStore";
import { HowToPlayModal } from "./HowToPlayModal";

describe("HowToPlayModal", () => {
	beforeEach(() => {
		useGameModalStore.setState({ modal: "howToPlay" });
	});

	it("dismisses the guide from its action", () => {
		render(<HowToPlayModal />);

		fireEvent.click(screen.getByRole("button", { name: "Close" }));

		expect(useGameModalStore.getState().modal).toBeNull();
		expect(localStorage.getItem(HOW_TO_PLAY_SEEN_STORAGE_KEY)).toBe("seen");
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});
});
