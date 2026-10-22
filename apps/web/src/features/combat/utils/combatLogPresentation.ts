import clsx from "clsx";
import type { CombatLogEntry } from "@app/engine";
import { getDamageTypeTextClass } from "../../../presentation/damage";

const logActorClass: Record<CombatLogEntry["actor"], string> = {
	enemy: "text-text",
	player: "text-text-bright",
	system: "text-text-muted",
};

function getLogEntryTextClass(entry: CombatLogEntry): string {
	if (entry.eventType === "reward_gained") {
		return "text-primary";
	}

	if (entry.eventType === "combatant_slain") {
		if (entry.actor === "player") {
			return "text-success";
		}
		if (entry.actor === "enemy") {
			return "text-error";
		}
		return logActorClass[entry.actor];
	}

	if (entry.outcome?.type === "damage") {
		const { outcome } = entry;
		return outcome.hpDamage === 0 && outcome.absorbedDamage > 0
			? "text-text-muted"
			: getDamageTypeTextClass(outcome.damageType);
	}

	if (entry.outcome?.type === "healing") {
		return entry.outcome.amount > 0 ? "text-healing" : "text-text-muted";
	}

	if (
		entry.outcome?.type === "miss" ||
		entry.eventType === "effect_resisted" ||
		entry.eventType === "effect_expired"
	) {
		return "text-text-muted";
	}

	return logActorClass[entry.actor];
}

export function getCombatLogEntryClassName(entry: CombatLogEntry, startsRound: boolean): string {
	const isAction =
		entry.eventType === "basic_attack" ||
		entry.eventType === "skill_used" ||
		entry.eventType === "healing_potion_used" ||
		entry.eventType === "turn_skipped";

	return clsx("break-words", getLogEntryTextClass(entry), {
		"mt-2": isAction && !startsRound,
	});
}
