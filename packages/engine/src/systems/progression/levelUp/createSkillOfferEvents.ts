import type { EngineEvent, PendingLevelUp } from "../../../schemas";

type SkillOfferEvent = Extract<EngineEvent, { type: "SKILL_OFFERED" }>;

export function createSkillOfferEvents(pendingLevelUp: PendingLevelUp | null): SkillOfferEvent[] {
	if (!pendingLevelUp) {
		return [];
	}

	const events: SkillOfferEvent[] = [];

	for (const option of pendingLevelUp.options) {
		if (option.type === "skill") {
			events.push({
				type: "SKILL_OFFERED",
				skillId: option.skillId,
				level: pendingLevelUp.level,
				rerollIndex: pendingLevelUp.rerollIndex,
			});
		}
	}

	return events;
}
