import { fireEvent, render, screen } from "@testing-library/react";
import type { RunView } from "@app/shared";
import { beforeEach, describe, expect, it, vi } from "vitest";

const selectHeroProgression = vi.hoisted(() => vi.fn());
const mutate = vi.hoisted(() => vi.fn());
const showError = vi.hoisted(() => vi.fn());

vi.mock("@app/engine", async (importOriginal) => ({
	...(await importOriginal<typeof import("@app/engine")>()),
	selectHeroProgression,
}));
vi.mock("../../runs", () => ({
	useApplyRunAction: () => ({ mutate, isPending: false }),
	getEngineErrorMessage: (error: string) => `Engine: ${error}`,
}));
vi.mock("../../../stores/errorModalStore", () => ({
	useErrorModalStore: (selector: (state: { showError: typeof showError }) => unknown) =>
		selector({ showError }),
}));
vi.mock("./LevelUpModal", () => ({
	LevelUpModal: ({
		onConfirm,
	}: {
		onConfirm: (selection: { optionIndex: number } | null) => void;
	}) => (
		<div>
			<span>Level-up modal</span>
			<button onClick={() => onConfirm({ optionIndex: 1 })}>Confirm level-up</button>
			<button onClick={() => onConfirm(null)}>Continue level-up</button>
		</div>
	),
}));

import { LevelUpModalController } from "./LevelUpModalController";

const run = { id: "run-id", state: {} } as RunView;

describe("LevelUpModalController", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		selectHeroProgression.mockReturnValue({
			pendingLevelUp: { level: 2, hpGain: 5, options: [] },
		});
	});

	it("does not render without a pending level-up", () => {
		selectHeroProgression.mockReturnValue({ pendingLevelUp: null });

		render(<LevelUpModalController run={run} />);

		expect(screen.queryByText("Level-up modal")).not.toBeInTheDocument();
	});

	it("submits the selected level-up option", () => {
		render(<LevelUpModalController run={run} />);

		fireEvent.click(screen.getByRole("button", { name: "Confirm level-up" }));

		expect(mutate).toHaveBeenCalledWith(
			{
				runId: "run-id",
				action: {
					type: "COMPLETE_LEVEL_UP",
					selection: { optionIndex: 1 },
				},
			},
			expect.any(Object),
		);
	});

	it("supports level-ups without a selection", () => {
		render(<LevelUpModalController run={run} />);

		fireEvent.click(screen.getByRole("button", { name: "Continue level-up" }));

		expect(mutate).toHaveBeenCalledWith(
			{
				runId: "run-id",
				action: { type: "COMPLETE_LEVEL_UP", selection: null },
			},
			expect.any(Object),
		);
	});

	it("shows translated engine failures", () => {
		render(<LevelUpModalController run={run} />);
		fireEvent.click(screen.getByRole("button", { name: "Continue level-up" }));
		const callbacks = mutate.mock.calls[0][1];

		callbacks.onSuccess({ result: { ok: false, error: "INVALID_LEVEL_UP_SELECTION" } });

		expect(showError).toHaveBeenCalledWith("Engine: INVALID_LEVEL_UP_SELECTION");
	});

	it("does not show an error after a successful engine result", () => {
		render(<LevelUpModalController run={run} />);
		fireEvent.click(screen.getByRole("button", { name: "Continue level-up" }));
		const callbacks = mutate.mock.calls[0][1];

		callbacks.onSuccess({ result: { ok: true } });

		expect(showError).not.toHaveBeenCalled();
	});

	it("shows a stable transport failure", () => {
		render(<LevelUpModalController run={run} />);
		fireEvent.click(screen.getByRole("button", { name: "Continue level-up" }));
		const callbacks = mutate.mock.calls[0][1];

		callbacks.onError();

		expect(showError).toHaveBeenCalledWith(
			"Unable to complete the level-up. Please try again.",
		);
	});
});
