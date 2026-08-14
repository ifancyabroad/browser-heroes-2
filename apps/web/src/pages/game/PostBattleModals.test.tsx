import { act, render, screen } from "@testing-library/react";
import type { RunView } from "@app/shared";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../../features/levelUp", () => ({
	LevelUpModalController: () => <div>Level-up controller</div>,
}));
vi.mock("../../features/rewards", () => ({
	RewardModalController: () => <div>Reward controller</div>,
}));
vi.mock("../../features/runSummary", () => ({
	FinalBossVictoryModalController: () => <div>Final boss controller</div>,
}));

import { PostBattleModals } from "./PostBattleModals";

function createRun(status: "active" | "player_won", battleNumber = 7): RunView {
	return {
		id: "run-id",
		state: {
			phase: "combat",
			battleNumber,
			combat: { status, enemy: { id: `enemy-${battleNumber}` } },
		} as RunView["state"],
	} as RunView;
}

describe("PostBattleModals", () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it("delays the modal controllers when combat becomes a victory", () => {
		vi.useFakeTimers();
		const { rerender } = render(<PostBattleModals run={createRun("active")} />);

		rerender(<PostBattleModals run={createRun("player_won")} />);

		expect(screen.queryByText("Level-up controller")).not.toBeInTheDocument();
		expect(screen.queryByText("Reward controller")).not.toBeInTheDocument();
		expect(screen.queryByText("Final boss controller")).not.toBeInTheDocument();

		act(() => vi.advanceTimersByTime(999));
		expect(screen.queryByText("Level-up controller")).not.toBeInTheDocument();

		act(() => vi.advanceTimersByTime(1));
		expect(screen.getByText("Level-up controller")).toBeInTheDocument();
		expect(screen.getByText("Reward controller")).toBeInTheDocument();
		expect(screen.getByText("Final boss controller")).toBeInTheDocument();
	});

	it("shows the modal controllers immediately when a victory is loaded", () => {
		render(<PostBattleModals run={createRun("player_won")} />);

		expect(screen.getByText("Level-up controller")).toBeInTheDocument();
		expect(screen.getByText("Reward controller")).toBeInTheDocument();
		expect(screen.getByText("Final boss controller")).toBeInTheDocument();
	});

	it("delays each new victory independently", () => {
		vi.useFakeTimers();
		const { rerender } = render(<PostBattleModals run={createRun("active")} />);

		rerender(<PostBattleModals run={createRun("player_won")} />);
		act(() => vi.advanceTimersByTime(1_000));
		expect(screen.getByText("Level-up controller")).toBeInTheDocument();

		rerender(<PostBattleModals run={createRun("active", 8)} />);
		rerender(<PostBattleModals run={createRun("player_won", 8)} />);
		expect(screen.queryByText("Level-up controller")).not.toBeInTheDocument();

		act(() => vi.advanceTimersByTime(1_000));
		expect(screen.getByText("Level-up controller")).toBeInTheDocument();
	});
});
