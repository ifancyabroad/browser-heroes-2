import type { RunView } from "@app/shared";
import { Layout } from "../../../components/Layout";
import { getEngineErrorMessage, useApplyRunAction } from "../../runs";
import { useErrorModalStore } from "../../../stores/errorModalStore";
import { Button } from "../../../components/Button";

type CombatViewProps = {
	run: RunView;
};

export function CombatView({ run }: CombatViewProps) {
	const applyRunAction = useApplyRunAction();
	const showError = useErrorModalStore((state) => state.showError);

	const { combat, hero } = run.state;

	if (!combat) {
		return <p>Combat state is unavailable.</p>;
	}

	function handleBasicAttack() {
		applyRunAction.mutate(
			{
				runId: run.id,
				action: {
					type: "PLAYER_BASIC_ATTACK",
				},
			},
			{
				onSuccess: ({ result }) => {
					if (!result.ok) {
						showError(getEngineErrorMessage(result.error));
					}
				},
				onError: () => {
					showError("Unable to perform the attack. Please try again.");
				},
			},
		);
	}

	return (
		<Layout>
			<div className="flex flex-1 bg-bg-base text-base">
				<h1>Combat</h1>

				<section>
					<h2>{hero.name}</h2>
					<p>
						HP: {hero.currentHp} / {hero.maxHp}
					</p>
				</section>

				<section>
					<h2>{combat.enemy.name}</h2>
					<p>
						HP: {combat.enemy.currentHp} / {combat.enemy.maxHp}
					</p>
				</section>

				<Button
					className="text-primary"
					type="button"
					onClick={handleBasicAttack}
					disabled={applyRunAction.isPending}
				>
					Basic attack
				</Button>
			</div>
		</Layout>
	);
}
