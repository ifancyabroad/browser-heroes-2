import { fireEvent, render, screen } from "@testing-library/react";
import type { RunView } from "@app/shared";
import { beforeEach, describe, expect, it, vi } from "vitest";

const engine = vi.hoisted(() => ({
	selectHeroProgression: vi.fn(),
	selectRewardChoiceView: vi.fn(),
}));
const mutate = vi.hoisted(() => vi.fn());
const showError = vi.hoisted(() => vi.fn());

vi.mock("@app/engine", async (importOriginal) => ({
	...(await importOriginal<typeof import("@app/engine")>()),
	...engine,
}));
vi.mock("../../runs", () => ({
	useApplyRunAction: () => ({ mutate, isPending: false }),
	getEngineErrorMessage: (error: string) => `Engine: ${error}`,
}));
vi.mock("../../../stores/errorModalStore", () => ({
	useErrorModalStore: (selector: (state: { showError: typeof showError }) => unknown) =>
		selector({ showError }),
}));
vi.mock("./RewardModal", () => ({
	RewardModal: ({
		onConfirm,
		onChooseReplacement,
	}: {
		onConfirm: (selection: { optionIndex: number }) => void;
		onChooseReplacement: (option: unknown) => void;
	}) => (
		<div>
			<button onClick={() => onConfirm({ optionIndex: 0 })}>Choose gold</button>
			<button
				onClick={() =>
					onChooseReplacement({
						type: "item",
						optionIndex: 1,
						item: { id: "item-id" },
						destinations: ["mainHand"],
						requiresEquipmentSlotSelection: true,
					})
				}
			>
				Choose replacement
			</button>
		</div>
	),
}));
vi.mock("../../../components/EquipmentSlotModal", () => ({
	EquipmentSlotModal: ({
		onCancel,
		onConfirm,
	}: {
		onCancel: () => void;
		onConfirm: (slot: "mainHand") => void;
	}) => (
		<div>
			<span>Replacement modal</span>
			<button onClick={onCancel}>Cancel replacement</button>
			<button onClick={() => onConfirm("mainHand")}>Confirm replacement</button>
		</div>
	),
}));

import { RewardModalController } from "./RewardModalController";

const run = { id: "run-id", state: {} } as RunView;
const rewardChoice = { options: [{ type: "gold", optionIndex: 0, amount: 10 }] };

describe("RewardModalController", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		engine.selectHeroProgression.mockReturnValue({ pendingLevelUp: null });
		engine.selectRewardChoiceView.mockReturnValue(rewardChoice);
	});

	it("does not render without a reward or while level-up is pending", () => {
		engine.selectRewardChoiceView.mockReturnValueOnce(null);
		const { rerender } = render(<RewardModalController run={run} />);
		expect(screen.queryByText("Choose gold")).not.toBeInTheDocument();

		engine.selectRewardChoiceView.mockReturnValue(rewardChoice);
		engine.selectHeroProgression.mockReturnValue({ pendingLevelUp: {} });
		rerender(<RewardModalController run={run} />);
		expect(screen.queryByText("Choose gold")).not.toBeInTheDocument();
	});

	it("submits the selected reward for the current run", () => {
		render(<RewardModalController run={run} />);

		fireEvent.click(screen.getByRole("button", { name: "Choose gold" }));

		expect(mutate).toHaveBeenCalledWith(
			{
				runId: "run-id",
				action: { type: "SELECT_REWARD", selection: { optionIndex: 0 } },
			},
			expect.any(Object),
		);
	});

	it("shows translated engine failures", () => {
		render(<RewardModalController run={run} />);
		fireEvent.click(screen.getByRole("button", { name: "Choose gold" }));
		const callbacks = mutate.mock.calls[0][1];

		callbacks.onSuccess({ result: { ok: false, error: "INVALID_REWARD_SELECTION" } });

		expect(showError).toHaveBeenCalledWith("Engine: INVALID_REWARD_SELECTION");
	});

	it("shows a stable transport failure", () => {
		render(<RewardModalController run={run} />);
		fireEvent.click(screen.getByRole("button", { name: "Choose gold" }));
		const callbacks = mutate.mock.calls[0][1];

		callbacks.onError();

		expect(showError).toHaveBeenCalledWith("Unable to select the reward. Please try again.");
	});

	it("collects an equipment destination before submitting item rewards", () => {
		render(<RewardModalController run={run} />);

		fireEvent.click(screen.getByRole("button", { name: "Choose replacement" }));
		expect(screen.getByText("Replacement modal")).toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "Confirm replacement" }));

		expect(mutate).toHaveBeenCalledWith(
			{
				runId: "run-id",
				action: {
					type: "SELECT_REWARD",
					selection: { optionIndex: 1, equipmentSlot: "mainHand" },
				},
			},
			expect.any(Object),
		);
	});

	it("can cancel equipment replacement and return to reward choice", () => {
		render(<RewardModalController run={run} />);
		fireEvent.click(screen.getByRole("button", { name: "Choose replacement" }));

		fireEvent.click(screen.getByRole("button", { name: "Cancel replacement" }));

		expect(screen.getByRole("button", { name: "Choose gold" })).toBeInTheDocument();
		expect(mutate).not.toHaveBeenCalled();
	});
});
