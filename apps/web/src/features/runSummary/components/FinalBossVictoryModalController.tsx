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
			title="Victory!"
			onClose={() => undefined}
			dismissible={false}
			size="sm"
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
						Retire
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
						Town
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
						Continue
					</Button>
				</div>
			}
		>
			<div className="grid gap-4 text-base">
				<p className="text-text-bright">
					The final foe has fallen. {run.state.hero.name} has earned their rest.
				</p>
				<p className="text-text">
					Retire and end the journey in victory, or continue beyond battle 100. Visit town
					first to prepare, or press on now.
				</p>
				<p className="text-error">
					WARNING: Continuing leaves retirement behind. Stronger foes await.
				</p>
			</div>
		</Modal>
	);
}
