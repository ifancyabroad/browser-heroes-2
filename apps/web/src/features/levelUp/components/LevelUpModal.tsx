import { useEffect, useState } from "react";
import type { LevelUpSelection, PendingLevelUp } from "@app/engine";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { LevelUpOptionList } from "./LevelUpOptionList";

type LevelUpModalProps = {
	pendingLevelUp: PendingLevelUp;
	isPending: boolean;
	levelUpRerolls: number;
	canReroll: boolean;
	onConfirm: (selection: LevelUpSelection | null) => void;
	onReroll: () => void;
};

export function LevelUpModal({
	pendingLevelUp,
	isPending,
	levelUpRerolls,
	canReroll,
	onConfirm,
	onReroll,
}: LevelUpModalProps) {
	const [selection, setSelection] = useState<LevelUpSelection | null>(null);
	const hasOptions = pendingLevelUp.options.length > 0;
	const canConfirm = !isPending && (!hasOptions || selection !== null);
	const optionKey = pendingLevelUp.options
		.map((option) =>
			option.type === "skill" ? `skill:${option.skillId}` : `feat:${option.featId}`,
		)
		.join("|");

	useEffect(() => {
		setSelection(null);
	}, [optionKey]);

	function handleConfirm() {
		if (!canConfirm) {
			return;
		}

		onConfirm(hasOptions ? selection : null);
	}

	return (
		<Modal
			open
			title="Level Up"
			onClose={() => undefined}
			dismissible={false}
			footer={
				<div className="flex flex-wrap justify-end gap-2">
					{hasOptions && (
						<Button
							type="button"
							aria-label={`Reroll level-up choices. ${levelUpRerolls} remaining`}
							disabled={isPending || !canReroll}
							title={getRerollUnavailableReason(levelUpRerolls, canReroll)}
							onClick={onReroll}
						>
							Reroll ({levelUpRerolls})
						</Button>
					)}
					<Button
						type="button"
						variant="primary"
						disabled={!canConfirm}
						onClick={handleConfirm}
					>
						{hasOptions ? "Confirm" : "Continue"}
					</Button>
				</div>
			}
		>
			<div className="grid gap-4 text-base">
				<p>
					Congratulations, you reached{" "}
					<span className="text-text-bright">level {pendingLevelUp.level}!</span> <br />
					<span className="text-success">+{pendingLevelUp.hpGain} Max HP</span>
				</p>

				{hasOptions && (
					<>
						<p className="text-text-bright">
							{getSelectionInstruction(pendingLevelUp.options)}
						</p>
						<LevelUpOptionList
							options={pendingLevelUp.options}
							selection={selection}
							disabled={isPending}
							onSelect={setSelection}
						/>
					</>
				)}
			</div>
		</Modal>
	);
}

function getRerollUnavailableReason(remaining: number, canReroll: boolean) {
	if (remaining === 0) {
		return "No level-up rerolls remain.";
	}

	if (!canReroll) {
		return "No alternative level-up choices are available.";
	}

	return undefined;
}

function getSelectionInstruction(options: PendingLevelUp["options"]) {
	const optionType = options[0]?.type;

	if (optionType === "skill") {
		return "Choose a skill to learn.";
	}

	if (optionType === "feat") {
		return "Choose a passive feat.";
	}

	return "Choose a level-up reward.";
}
