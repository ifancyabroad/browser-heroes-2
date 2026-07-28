import clsx from "clsx";
import { SKILLS_BY_ID } from "@app/content";
import type { ActiveCombatEffect } from "@app/engine";
import { Tooltip } from "../../../components/Tooltip";
import {
	formatActiveEffectDetail,
	getActiveEffectTone,
	getToneTextClassName,
} from "../../../presentation/effects";
import attackIcon from "../../../assets/images/actions/Skill_Attack.png";
import { resolveImageUrl } from "../../../utils/image";

type ActiveEffectsRowProps = {
	effects: ActiveCombatEffect[];
	label: string;
};

export function ActiveEffectsRow({ effects, label }: ActiveEffectsRowProps) {
	const effectGroups = groupEffectsBySource(effects);

	return (
		<div className="min-h-8" aria-label={label}>
			{effectGroups.length > 0 && (
				<div className="flex flex-wrap gap-1">
					{effectGroups.map((group) => {
						return (
							<Tooltip
								key={group.key}
								content={
									<ActiveEffectTooltipContent
										sourceName={group.sourceName}
										effects={group.effects}
									/>
								}
							>
								<span
									className="block h-8 w-8 overflow-hidden border-2 border-bg-elevated bg-bg-elevated"
									aria-label={`${group.sourceName} active effects`}
								>
									<img
										src={group.icon}
										alt=""
										loading="lazy"
										className="h-full w-full scale-110 object-cover"
										aria-hidden
									/>
								</span>
							</Tooltip>
						);
					})}
				</div>
			)}
		</div>
	);
}

type ActiveEffectGroup = {
	key: string;
	sourceName: string;
	icon: string;
	effects: ActiveCombatEffect[];
};

type ActiveEffectTooltipContentProps = {
	sourceName: string;
	effects: readonly ActiveCombatEffect[];
};

function ActiveEffectTooltipContent({ sourceName, effects }: ActiveEffectTooltipContentProps) {
	return (
		<div className="grid gap-1">
			<p className="break-words text-text-bright">{sourceName}</p>
			<ul className="grid gap-1">
				{effects.map((effect) => (
					<li key={effect.id} className="flex items-baseline justify-between gap-3">
						<span
							className={clsx(
								"min-w-0 break-words",
								getActiveEffectTextClassName(effect),
							)}
						>
							{formatActiveEffectDetail(effect)}
						</span>
						<span className="shrink-0 text-text-muted">{effect.remainingTurns}t</span>
					</li>
				))}
			</ul>
		</div>
	);
}

function groupEffectsBySource(effects: readonly ActiveCombatEffect[]): ActiveEffectGroup[] {
	const groups = new Map<string, ActiveEffectGroup>();

	for (const effect of effects) {
		const source = getActiveEffectDisplaySource(effect);
		const existing = groups.get(source.key);

		if (existing) {
			existing.effects.push(effect);
		} else {
			groups.set(source.key, {
				...source,
				effects: [effect],
			});
		}
	}

	return Array.from(groups.values());
}

function getActiveEffectDisplaySource(effect: ActiveCombatEffect) {
	const sourceKeyPrefix = `${effect.sourceCombatantId}:${effect.source.type}`;

	if (effect.source.type === "skill") {
		const skill = SKILLS_BY_ID[effect.source.skillId];

		return {
			key: `${sourceKeyPrefix}:${effect.source.skillId}`,
			sourceName: skill.name,
			icon: resolveImageUrl(skill.icon),
		};
	}

	return {
		key: `${sourceKeyPrefix}:${effect.source.sourceName}`,
		sourceName: effect.source.sourceName,
		icon: attackIcon,
	};
}

function getActiveEffectTextClassName(effect: ActiveCombatEffect) {
	return getToneTextClassName(getActiveEffectTone(effect), "text-text");
}
