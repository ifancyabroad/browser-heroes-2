import { fireEvent, render, screen } from "@testing-library/react";
import type { RunView } from "@app/shared";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../features/combat", () => ({
	CombatView: () => <div>Frozen combat frame</div>,
}));

import { GamePhaseTransition } from "./GamePhaseTransition";

function createRun(phase: "combat" | "dead"): RunView {
	return { id: "run-id", state: { phase } } as RunView;
}

function setReducedMotion(matches: boolean) {
	Object.defineProperty(window, "matchMedia", {
		configurable: true,
		value: vi.fn().mockReturnValue({ matches }),
	});
}

describe("GamePhaseTransition", () => {
	beforeEach(() => {
		setReducedMotion(false);
	});

	it("renders the current phase without a transition initially", () => {
		render(<GamePhaseTransition run={createRun("combat")}>Current phase</GamePhaseTransition>);

		expect(screen.getByText("Current phase")).toBeInTheDocument();
	});

	it("holds the combat frame during a combat-to-death transition", () => {
		const { rerender } = render(
			<GamePhaseTransition run={createRun("combat")}>Combat phase</GamePhaseTransition>,
		);

		rerender(<GamePhaseTransition run={createRun("dead")}>Death phase</GamePhaseTransition>);

		const frame = screen.getByText("Frozen combat frame").parentElement!;
		expect(frame).toHaveAttribute("aria-hidden", "true");
		expect(screen.queryByText("Death phase")).not.toBeInTheDocument();

		fireEvent.animationEnd(frame);
		expect(screen.getByText("Death phase")).toBeInTheDocument();
	});

	it("skips transitions when reduced motion is preferred", () => {
		setReducedMotion(true);
		const { rerender } = render(
			<GamePhaseTransition run={createRun("combat")}>Combat phase</GamePhaseTransition>,
		);

		rerender(<GamePhaseTransition run={createRun("dead")}>Death phase</GamePhaseTransition>);

		expect(screen.getByText("Death phase")).toBeInTheDocument();
		expect(screen.queryByText("Frozen combat frame")).not.toBeInTheDocument();
	});
});
