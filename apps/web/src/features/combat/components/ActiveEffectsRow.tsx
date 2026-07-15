import clsx from "clsx";
import { SKILLS_BY_ID } from "@app/content";
import type { ActiveCombatEffect } from "@app/engine";
import { Tooltip } from "../../../components/Tooltip";
import { damageTypeLabels, modifiableStatLabels } from "../../../game/displayLabels";
import {
	formatModifierValue,
	formatTitle,
	getDamageAffinityTone,
	getNumericModifierTone,
	getToneTextClassName,
	type ModifierTone,
} from "../../../game/effectDisplay";
import attackIcon from "../../../assets/images/actions/Skill_Attack.png";

type ActiveEffectsRowProps = {
	effects: ActiveCombatEffect[];
	label: string;
};

export function ActiveEffectsRow({ effects, label }: ActiveEffectsRowProps) {
	const effectGroups = groupEffectsBySource(effects);

	return (
		<div className="min-h-7" aria-label={label}>
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
								contentClassName="w-56 max-w-[calc(100vw-1rem)] sm:w-64"
							>
								<span
									className="relative block h-7 w-7 overflow-hidden border-2 border-bg-elevated bg-bg-elevated"
									aria-label={`${group.sourceName} active effects`}
								>
									<img
										src={group.icon}
										alt=""
										loading="lazy"
										className="h-full w-full scale-110 object-cover"
										aria-hidden
									/>
									{group.effects.length > 1 && (
										<span className="absolute bottom-0 right-0 bg-bg-base/90 px-1 text-text-bright">
											{group.effects.length}
										</span>
									)}
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
		<div className="grid gap-2">
			<p className="break-words">{sourceName}</p>
			<ul className="grid gap-2 border-t-2 border-border/70 pt-2">
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
			icon: skill.icon,
		};
	}

	return {
		key: `${sourceKeyPrefix}:${effect.source.sourceName}`,
		sourceName: effect.source.sourceName,
		icon: attackIcon,
	};
}

function formatActiveEffectDetail(effect: ActiveCombatEffect) {
	switch (effect.type) {
		case "status":
			return formatTitle(effect.statusId);

		case "modifyStat":
			return `${modifiableStatLabels[effect.stat]} ${formatModifierValue(effect.operation, effect.value)}`;

		case "modifyDamage":
			return `${effect.damageType ? damageTypeLabels[effect.damageType] : "All"} damage ${formatModifierValue(effect.operation, effect.value)}`;

		case "modifyDamageTaken":
			return `${effect.damageType ? damageTypeLabels[effect.damageType] : "All"} damage taken ${formatModifierValue(effect.operation, effect.value)}`;

		case "modifyDamageAffinity":
			return `${effect.operation === "add" ? "Adds" : "Removes"} ${damageTypeLabels[effect.damageType]} ${formatTitle(effect.affinity)}`;

		case "damageOverTime":
			return `${effect.dice} ${damageTypeLabels[effect.damageType]} per turn`;

		case "healOverTime":
			return `${effect.dice} healing per turn`;

		case "shield":
			return `${effect.remainingAmount} shield`;
	}
}

function getActiveEffectTextClassName(effect: ActiveCombatEffect) {
	return getToneTextClassName(getActiveEffectTone(effect), "text-text");
}

function getActiveEffectTone(effect: ActiveCombatEffect): ModifierTone {
	switch (effect.type) {
		case "status":
			return "negative";

		case "modifyStat":
		case "modifyDamage":
		case "modifyDamageTaken":
			return getNumericModifierTone(effect.operation, effect.value);

		case "modifyDamageAffinity":
			return getDamageAffinityTone(effect.operation, effect.affinity);

		case "damageOverTime":
			return "negative";

		case "healOverTime":
		case "shield":
			return "positive";

		default:
			return "neutral";
	}
}
