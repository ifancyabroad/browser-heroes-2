import clsx from "clsx";
import { SKILLS_BY_ID, type SkillId } from "@app/content";
import type { ActiveCombatEffect } from "@app/engine";
import { Tooltip } from "../../../components/Tooltip";
import { damageTypeLabels, modifiableStatLabels } from "../../../game/displayLabels";
import { formatModifierValue, formatTitle } from "../../../game/effectDisplay";

type ActiveEffectsRowProps = {
	effects: ActiveCombatEffect[];
	label: string;
};

export function ActiveEffectsRow({ effects, label }: ActiveEffectsRowProps) {
	const effectGroups = groupEffectsBySourceSkill(effects);

	return (
		<div className="min-h-7" aria-label={label}>
			{effectGroups.length > 0 && (
				<ul className="flex flex-wrap gap-1">
					{effectGroups.map((group) => {
						const sourceSkill = SKILLS_BY_ID[group.skillId];

						return (
							<li key={group.skillId}>
								<Tooltip
									content={
										<ActiveEffectTooltipContent
											skillName={sourceSkill.name}
											effects={group.effects}
										/>
									}
									contentClassName="w-56 max-w-[calc(100vw-1rem)] sm:w-64"
								>
									<span
										className="relative block h-7 w-7 overflow-hidden border border-border bg-bg-elevated"
										aria-label={`${sourceSkill.name} active effects`}
									>
										<img
											src={sourceSkill.icon}
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
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}

type ActiveEffectGroup = {
	skillId: SkillId;
	effects: ActiveCombatEffect[];
};

type ActiveEffectTooltipContentProps = {
	skillName: string;
	effects: readonly ActiveCombatEffect[];
};

function ActiveEffectTooltipContent({ skillName, effects }: ActiveEffectTooltipContentProps) {
	return (
		<div className="grid gap-2">
			<p className="break-words text-text-bright">{skillName}</p>
			<ul className="grid gap-2 border-t border-border pt-2">
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

function groupEffectsBySourceSkill(effects: readonly ActiveCombatEffect[]): ActiveEffectGroup[] {
	const groups = new Map<SkillId, ActiveCombatEffect[]>();

	for (const effect of effects) {
		const existing = groups.get(effect.sourceSkillId);

		if (existing) {
			existing.push(effect);
		} else {
			groups.set(effect.sourceSkillId, [effect]);
		}
	}

	return Array.from(groups, ([skillId, groupedEffects]) => ({
		skillId,
		effects: groupedEffects,
	}));
}

function formatActiveEffectDetail(effect: ActiveCombatEffect) {
	switch (effect.type) {
		case "status":
			return formatTitle(effect.statusId);

		case "modifyStat":
			return `${modifiableStatLabels[effect.stat]} ${formatModifierValue(effect.operation, effect.value)}`;

		case "modifyDamage":
			return `${effect.damageType ? damageTypeLabels[effect.damageType] : "All"} damage ${formatModifierValue(effect.operation, effect.value)}`;

		case "modifyDamageAffinity":
			return `${effect.operation === "add" ? "Adds" : "Removes"} ${damageTypeLabels[effect.damageType]} ${formatTitle(effect.affinity)}`;
	}
}

function getActiveEffectTextClassName(effect: ActiveCombatEffect) {
	const tone = getActiveEffectTone(effect);

	switch (tone) {
		case "positive":
			return "text-success";
		case "negative":
			return "text-error";
		case "neutral":
			return "text-text";
	}
}

function getActiveEffectTone(effect: ActiveCombatEffect): "positive" | "negative" | "neutral" {
	switch (effect.type) {
		case "status":
			return "negative";

		case "modifyStat":
		case "modifyDamage":
			return getNumericModifierTone(effect.operation, effect.value);

		case "modifyDamageAffinity": {
			const improvesDefense =
				(effect.operation === "add" && effect.affinity !== "vulnerability") ||
				(effect.operation === "remove" && effect.affinity === "vulnerability");

			return improvesDefense ? "positive" : "negative";
		}
	}
}

function getNumericModifierTone(
	operation: "add" | "multiply" | "set",
	value: number,
): "positive" | "negative" | "neutral" {
	if (operation === "set" || value === 0 || value === 1) {
		return "neutral";
	}

	if (operation === "multiply") {
		return value > 1 ? "positive" : "negative";
	}

	return value > 0 ? "positive" : "negative";
}
