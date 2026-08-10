import type { EngineAction, RewardChoiceOptionView, RewardChoiceView } from "@app/engine";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { RewardOptionList } from "./RewardOptionList";

type RewardSelection = Extract<EngineAction, { type: "SELECT_REWARD" }>["selection"];
type ItemRewardOptionView = Extract<RewardChoiceOptionView, { type: "item" }>;

type RewardModalProps = {
	rewardChoice: RewardChoiceView;
	isPending: boolean;
	onConfirm: (selection: RewardSelection) => void;
	onChooseReplacement: (option: ItemRewardOptionView) => void;
};

export function RewardModal({
	rewardChoice,
	isPending,
	onConfirm,
	onChooseReplacement,
}: RewardModalProps) {
	const [selection, setSelection] = useState<RewardChoiceOptionView | null>(null);
	const canConfirm = !isPending && selection !== null && canSubmitSelection(selection);

	function handleConfirm() {
		if (!canConfirm || !selection) {
			return;
		}

		if (selection.type === "item") {
			const automaticDestination = selection.equipmentPlacement.automaticDestination;

			if (!automaticDestination) {
				onChooseReplacement(selection);
				return;
			}

			onConfirm({
				optionIndex: selection.optionIndex,
				equipmentSlot: automaticDestination.equipmentSlot,
			});
			return;
		}

		onConfirm({ optionIndex: selection.optionIndex });
	}

	return (
		<Modal
			open
			title="Choose Reward"
			onClose={() => undefined}
			dismissible={false}
			footer={
				<Button
					type="button"
					variant="primary"
					disabled={!canConfirm}
					onClick={handleConfirm}
				>
					Confirm
				</Button>
			}
		>
			<div className="grid gap-4 text-base">
				<p className="text-text-bright">Select one reward from the battle.</p>
				<RewardOptionList
					options={rewardChoice.options}
					selection={selection}
					disabled={isPending}
					onSelect={setSelection}
				/>
			</div>
		</Modal>
	);
}

function canSubmitSelection(selection: RewardChoiceOptionView) {
	return selection.type === "gold" || selection.equipmentPlacement.destinations.length > 0;
}
