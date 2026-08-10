import { describe, expect, it } from "vitest";
import { combatLogEntrySchema } from "./log.schema";

const baseEntry = {
	id: "combat-log-1",
	turnNumber: 1,
	actor: "player" as const,
	message: "Outcome",
};

describe("combatLogEntrySchema", () => {
	it("requires structured damage metadata for damage entries", () => {
		expect(
			combatLogEntrySchema.safeParse({
				...baseEntry,
				eventType: "damage_dealt",
			}).success,
		).toBe(false);

		expect(
			combatLogEntrySchema.safeParse({
				...baseEntry,
				eventType: "damage_dealt",
				outcome: {
					type: "damage",
					targetId: "enemy",
					hpDamage: 10,
					absorbedDamage: 2,
					damageType: "fire",
					affinity: "normal",
					critical: true,
					halfDamageSave: false,
				},
			}).success,
		).toBe(true);
	});

	it("requires structured miss metadata for miss entries", () => {
		expect(
			combatLogEntrySchema.safeParse({
				...baseEntry,
				eventType: "attack_missed",
				outcome: { type: "miss", targetId: "enemy" },
			}).success,
		).toBe(true);

		expect(
			combatLogEntrySchema.safeParse({
				...baseEntry,
				eventType: "attack_missed",
			}).success,
		).toBe(false);
	});

	it("allows triggered effects with or without a damage outcome", () => {
		expect(
			combatLogEntrySchema.safeParse({
				...baseEntry,
				eventType: "effect_triggered",
			}).success,
		).toBe(true);

		expect(
			combatLogEntrySchema.safeParse({
				...baseEntry,
				eventType: "effect_triggered",
				outcome: {
					type: "damage",
					targetId: "enemy",
					hpDamage: 4,
					absorbedDamage: 0,
					damageType: "fire",
					affinity: "normal",
					critical: false,
					halfDamageSave: false,
				},
			}).success,
		).toBe(true);
	});
});
