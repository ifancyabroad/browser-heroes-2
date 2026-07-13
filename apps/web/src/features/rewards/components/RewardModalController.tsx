import {
	selectHeroProgression,
	selectRewardChoiceView,
	type EngineAction,
	type RewardChoiceOptionView,
} from "@app/engine";
import type { RunView } from "@app/shared";
import { useState } from "react";
import { EquipmentSlotReplacementModal } from "../../../components/EquipmentSlotReplacementModal";
import { useErrorModalStore } from "../../../stores/errorModalStore";
import { getEngineErrorMessage, useApplyRunAction } from "../../runs";
import { RewardModal } from "./RewardModal";

type RewardSelection = Extract<EngineAction, { type: "SELECT_REWARD" }>["selection"];
type ItemRewardOptionView = Extract<RewardChoiceOptionView, { type: "item" }>;

type RewardModalControllerProps = {
	run: RunView;
};

export function RewardModalController({ run }: RewardModalControllerProps) {
	const applyRunAction = useApplyRunAction();
	const showError = useErrorModalStore((state) => state.showError);
	const { pendingLevelUp } = selectHeroProgression(run.state);
	const rewardChoice = selectRewardChoiceView(run.state);
	const [replacementOption, setReplacementOption] = useState<ItemRewardOptionView | null>(null);

	if (pendingLevelUp || !rewardChoice) {
		return null;
	}

	function handleConfirm(selection: RewardSelection) {
		applyRunAction.mutate(
			{
				runId: run.id,
				action: {
					type: "SELECT_REWARD",
					selection,
				},
			},
			{
				onSuccess: ({ result }) => {
					if (!result.ok) {
						showError(getEngineErrorMessage(result.error));
					}
				},
				onError: () => {
					showError("Unable to select the reward. Please try again.");
				},
			},
		);
	}

	if (replacementOption) {
		return (
			<EquipmentSlotReplacementModal
				key={`replacement-${replacementOption.optionIndex}-${replacementOption.item.id}`}
				item={replacementOption.item}
				destinations={replacementOption.destinations}
				isPending={applyRunAction.isPending}
				onCancel={() => setReplacementOption(null)}
				onConfirm={(equipmentSlot) =>
					handleConfirm({
						optionIndex: replacementOption.optionIndex,
						equipmentSlot,
					})
				}
			/>
		);
	}

	return (
		<RewardModal
			key={rewardChoice.options
				.map((option) =>
					option.type === "gold"
						? `gold-${option.optionIndex}-${option.amount}`
						: `item-${option.optionIndex}-${option.item.id}`,
				)
				.join("|")}
			rewardChoice={rewardChoice}
			isPending={applyRunAction.isPending}
			onConfirm={handleConfirm}
			onChooseReplacement={setReplacementOption}
		/>
	);
}
