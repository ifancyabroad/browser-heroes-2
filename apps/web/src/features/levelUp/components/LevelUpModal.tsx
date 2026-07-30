import { useState } from "react";
import type { LevelUpSelection, PendingLevelUp } from "@app/engine";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { LevelUpOptionList } from "./LevelUpOptionList";

type LevelUpModalProps = {
	pendingLevelUp: PendingLevelUp;
	isPending: boolean;
	onConfirm: (selection: LevelUpSelection | null) => void;
};

export function LevelUpModal({ pendingLevelUp, isPending, onConfirm }: LevelUpModalProps) {
	const [selection, setSelection] = useState<LevelUpSelection | null>(null);
	const hasOptions = pendingLevelUp.options.length > 0;
	const canConfirm = !isPending && (!hasOptions || selection !== null);

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
			size="2xl"
			footer={
				<Button
					type="button"
					variant="primary"
					disabled={!canConfirm}
					onClick={handleConfirm}
				>
					{hasOptions ? "Confirm" : "Continue"}
				</Button>
			}
		>
			<div className="grid gap-4 text-base">
				<p>
					Congratulations you have reached{" "}
					<span className="text-primary">level {pendingLevelUp.level}</span>!
					<br />
					Max HP increased by{" "}
					<span className="text-primary">{pendingLevelUp.hpGain}</span>.
				</p>

				{hasOptions && (
					<>
						<p>{getSelectionInstruction(pendingLevelUp.options)}</p>
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

function getSelectionInstruction(options: PendingLevelUp["options"]) {
	const optionType = options[0]?.type;

	if (optionType === "skill") {
		return "Select a skill to learn before continuing.";
	}

	if (optionType === "feat") {
		return "Select a feat before continuing.";
	}

	return "Select a level-up reward before continuing.";
}
