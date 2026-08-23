import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { RunView } from "@app/shared";

const useGameRun = vi.hoisted(() => vi.fn());

vi.mock("../features/runs", () => ({ useGameRun }));
vi.mock("../features/town", () => ({ TownView: () => <div>Town view</div> }));
vi.mock("../features/combat", () => ({ CombatView: () => <div>Combat view</div> }));
vi.mock("../features/runSummary", () => ({
	DeathScreen: () => <div>Death screen</div>,
	VictoryScreen: () => <div>Victory screen</div>,
}));
vi.mock("../features/howToPlay", () => ({
	HowToPlayModal: () => <div>How to play modal</div>,
}));
vi.mock("./game/GamePhaseTransition", () => ({
	GamePhaseTransition: ({ children }: { children: React.ReactNode }) => children,
}));
vi.mock("./game/PostBattleModals", () => ({
	PostBattleModals: () => <div>Post-battle modals</div>,
}));

import Game from "./Game";

function createRun(phase: RunView["state"]["phase"]): RunView {
	return {
		id: "run-id",
		mode: "normal",
		dailyChallengeDate: null,
		status: phase === "town" || phase === "combat" ? "active" : phase,
		state: { phase } as RunView["state"],
		summary: {} as RunView["summary"],
		createdAt: "2026-01-01T00:00:00.000Z",
		updatedAt: "2026-01-01T00:00:00.000Z",
		completedAt: null,
	};
}

function renderGame() {
	return render(
		<MemoryRouter initialEntries={["/game"]}>
			<Routes>
				<Route path="/game" element={<Game />} />
				<Route path="/create-character" element={<div>Create character</div>} />
			</Routes>
		</MemoryRouter>,
	);
}

describe("Game", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("shows a loader while the current run is loading", () => {
		useGameRun.mockReturnValue({ data: undefined, isPending: true });

		renderGame();

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("redirects to character creation when there is no run", () => {
		useGameRun.mockReturnValue({ data: { run: null }, isPending: false });

		renderGame();

		expect(screen.getByText("Create character")).toBeInTheDocument();
	});

	it.each([
		["town", "Town view"],
		["combat", "Combat view"],
		["dead", "Death screen"],
		["retired", "Victory screen"],
	] as const)("renders the %s phase view", (phase, expectedView) => {
		useGameRun.mockReturnValue({
			data: { run: createRun(phase) },
			isPending: false,
		});

		renderGame();

		expect(screen.getByText(expectedView)).toBeInTheDocument();
	});

	it("keeps post-battle modals mounted around the phase view", () => {
		useGameRun.mockReturnValue({
			data: { run: createRun("combat") },
			isPending: false,
		});

		renderGame();

		expect(screen.getByText("Post-battle modals")).toBeInTheDocument();
		expect(screen.getByText("How to play modal")).toBeInTheDocument();
	});

	it("does not mount the how-to-play modal without a loaded run", () => {
		useGameRun.mockReturnValue({ data: undefined, isPending: true });

		renderGame();

		expect(screen.queryByText("How to play modal")).not.toBeInTheDocument();
	});
});
