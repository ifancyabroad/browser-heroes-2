import { FEATS_BY_ID, SKILLS_BY_ID } from "@app/content";
import clsx from "clsx";
import type { ActiveCombatEffect } from "@app/engine";
import { Tooltip } from "../../../components/Tooltip";
import {
	formatActiveEffectDetail,
	getActiveEffectTone,
	getToneTextClassName,
} from "../../../presentation/effects";
import { resolveImageUrl } from "../../../utils/image";

type ActiveEffectsRowProps = {
	effects: ActiveCombatEffect[];
	label: string;
};

export function ActiveEffectsRow({ effects, label }: ActiveEffectsRowProps) {
	const effectGroups = groupEffectsBySource(effects);

	return (
		<div className="flex min-h-8 flex-wrap gap-1" aria-label={label}>
			{effectGroups.map((group) => (
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
			))}
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
	const duration = effects[0]?.duration;
	const sharedDuration =
		duration &&
		effects.every(
			(effect) =>
				effect.duration.unit === duration.unit &&
				effect.duration.remaining === duration.remaining,
		)
			? duration
			: undefined;

	return (
		<div className="min-w-0 [overflow-wrap:anywhere]">
			<header className="mb-2">
				<p className="text-text-bright">{sourceName}</p>
			</header>
			<ul className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-2">
				{effects.map((effect) => (
					<li key={effect.id} className="min-w-0">
						<p className={getActiveEffectTextClassName(effect)}>
							{formatActiveEffectDetail(effect)}
						</p>
						{effect.type === "modifyRoll" && effect.remainingCharges !== undefined && (
							<p className="text-text-muted tabular-nums">
								{effect.remainingCharges}{" "}
								{effect.remainingCharges === 1 ? "charge" : "charges"} remaining
							</p>
						)}
						{!sharedDuration && (
							<p className="text-text-muted tabular-nums">
								{formatRemainingDuration(effect.duration)}
							</p>
						)}
					</li>
				))}
			</ul>
			{sharedDuration && (
				<footer
					className={clsx("text-text-muted tabular-nums", effects.length > 1 && "mt-2")}
				>
					{formatRemainingDuration(sharedDuration)}
				</footer>
			)}
		</div>
	);
}

function formatRemainingDuration(duration: ActiveCombatEffect["duration"]) {
	return `${duration.remaining} ${duration.remaining === 1 ? duration.unit.slice(0, -1) : duration.unit} remaining`;
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

	if (effect.source.type === "feat") {
		const feat = FEATS_BY_ID[effect.source.featId];

		return {
			key: `${sourceKeyPrefix}:${effect.source.featId}`,
			sourceName: feat.name,
			icon: resolveImageUrl(feat.icon),
		};
	}

	return {
		key: `${sourceKeyPrefix}:${effect.source.sourceName}`,
		sourceName: effect.source.sourceName,
		icon: resolveImageUrl(effect.source.sourceIcon),
	};
}

function getActiveEffectTextClassName(effect: ActiveCombatEffect) {
	return getToneTextClassName(getActiveEffectTone(effect), "text-text");
}
