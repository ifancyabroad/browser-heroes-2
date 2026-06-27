import { selectHeroProgression, type LevelUpSelection } from "@app/engine";
import type { RunView } from "@app/shared";
import { useErrorModalStore } from "../../../stores/errorModalStore";
import { getEngineErrorMessage, useApplyRunAction } from "../../runs";
import { LevelUpModal } from "./LevelUpModal";

type LevelUpModalControllerProps = {
	run: RunView;
};

export function LevelUpModalController({ run }: LevelUpModalControllerProps) {
	const applyRunAction = useApplyRunAction();
	const showError = useErrorModalStore((state) => state.showError);
	const progression = selectHeroProgression(run.state);
	const { pendingLevelUp } = progression;

	if (!pendingLevelUp) {
		return null;
	}

	function handleConfirm(selection: LevelUpSelection | null) {
		applyRunAction.mutate(
			{
				runId: run.id,
				action: {
					type: "COMPLETE_LEVEL_UP",
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
					showError("Unable to complete the level-up. Please try again.");
				},
			},
		);
	}

	return (
		<LevelUpModal
			key={pendingLevelUp.level}
			pendingLevelUp={pendingLevelUp}
			isPending={applyRunAction.isPending}
			onConfirm={handleConfirm}
		/>
	);
}
