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
			closeOnBackdropClick={false}
			className="max-w-2xl"
			footer={
				<Button
					type="button"
					className="text-primary disabled:cursor-not-allowed disabled:text-text-muted disabled:opacity-60"
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
					<LevelUpOptionList
						options={pendingLevelUp.options}
						selection={selection}
						disabled={isPending}
						onSelect={setSelection}
					/>
				)}
			</div>
		</Modal>
	);
}
