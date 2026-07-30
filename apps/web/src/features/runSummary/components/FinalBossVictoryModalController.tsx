import { selectAvailableActions, type EngineAction } from "@app/engine";
import type { RunView } from "@app/shared";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { useErrorModalStore } from "../../../stores/errorModalStore";
import { getEngineErrorMessage, useApplyRunAction } from "../../runs";

type FinalBossVictoryModalControllerProps = {
	run: RunView;
};

type FinalBossChoiceAction = Extract<
	EngineAction,
	{ type: "CONTINUE_TO_NEXT_COMBAT" | "RETURN_TO_TOWN" | "RETIRE_RUN" }
>;

export function FinalBossVictoryModalController({ run }: FinalBossVictoryModalControllerProps) {
	const applyRunAction = useApplyRunAction();
	const showError = useErrorModalStore((state) => state.showError);
	const availableActionTypes = new Set(
		selectAvailableActions(run.state).map((action) => action.type),
	);
	const canContinue = availableActionTypes.has("CONTINUE_TO_NEXT_COMBAT");
	const canReturnToTown = availableActionTypes.has("RETURN_TO_TOWN");
	const canRetire = availableActionTypes.has("RETIRE_RUN");

	if (run.state.phase !== "combat" || !canRetire) {
		return null;
	}

	function submitAction(action: FinalBossChoiceAction, fallbackErrorMessage: string) {
		applyRunAction.mutate(
			{
				runId: run.id,
				action,
			},
			{
				onSuccess: ({ result }) => {
					if (!result.ok) {
						showError(getEngineErrorMessage(result.error));
					}
				},
				onError: () => {
					showError(fallbackErrorMessage);
				},
			},
		);
	}

	return (
		<Modal
			open
			title="The Final Boss Falls"
			onClose={() => undefined}
			dismissible={false}
			size="2xl"
			footer={
				<div className="flex flex-wrap justify-end gap-4" aria-label="Final boss choices">
					<Button
						type="button"
						variant="success"
						disabled={applyRunAction.isPending || !canRetire}
						onClick={() =>
							submitAction(
								{ type: "RETIRE_RUN" },
								"Unable to retire this run. Please try again.",
							)
						}
					>
						Retire Victorious
					</Button>
					<Button
						type="button"
						disabled={applyRunAction.isPending || !canReturnToTown}
						onClick={() =>
							submitAction(
								{ type: "RETURN_TO_TOWN" },
								"Unable to return to town. Please try again.",
							)
						}
					>
						Prepare in Town
					</Button>
					<Button
						type="button"
						variant="primary"
						disabled={applyRunAction.isPending || !canContinue}
						onClick={() =>
							submitAction(
								{ type: "CONTINUE_TO_NEXT_COMBAT" },
								"Unable to continue onwards. Please try again.",
							)
						}
					>
						March Onward
					</Button>
				</div>
			}
		>
			<div className="grid gap-4 text-base">
				<p className="text-text-bright">
					The last tyrant of the hundredth battle lies defeated.
				</p>
				<p className="text-text">
					{run.state.hero.name} may retire with their life and victory secured, or
					continue beyond the victory ladder in pursuit of rarer renown.
				</p>
				<p className="text-text-muted">
					Preparing in town and marching straight on both continue the run; town is only a
					rest stop before the battles beyond.
				</p>
				<p className="text-error">
					WARNING: Continuing onward will strengthen the foes ahead.
				</p>
			</div>
		</Modal>
	);
}
