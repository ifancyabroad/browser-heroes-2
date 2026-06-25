import type { ActiveCombatEffect } from "@app/engine";
import { formatTitle } from "../utils/combatDisplay";

type ActiveEffectsRowProps = {
	effects: ActiveCombatEffect[];
	label: string;
};

export function ActiveEffectsRow({ effects, label }: ActiveEffectsRowProps) {
	return (
		<div className="min-h-7" aria-label={label}>
			{effects.length > 0 && (
				<ul className="flex flex-wrap gap-1">
					{effects.map((effect) => (
						<li key={effect.id} className="bg-bg-elevated px-2 text-text">
							<span className="text-primary">{formatTitle(effect.effectId)}</span>
							<span className="text-text-muted"> {effect.durationTurns}t</span>
							{effect.stacks > 1 && (
								<span className="text-text-muted"> x{effect.stacks}</span>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
