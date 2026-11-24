import { describe, expect, it } from "vitest";
import type { CombatLogEntry } from "@app/engine";
import { getCombatLogEntryClassName } from "./combatLogPresentation";

describe("consumable log presentation", () => {
	it("spaces consumable headings as actions without adding space at the start of a round", () => {
		const heading: CombatLogEntry = {
			id: "heading",
			turnNumber: 1,
			actor: "player",
			eventType: "consumable_used",
			message: "Hero uses Healing Potion.",
		};
		expect(getCombatLogEntryClassName(heading, false).split(" ")).toContain("mt-2");
		expect(getCombatLogEntryClassName(heading, true).split(" ")).not.toContain("mt-2");
	});

	it.each([0, 5])("styles the separate %i HP healing outcome", (amount) => {
		const outcome: CombatLogEntry = {
			id: "outcome",
			turnNumber: 1,
			actor: "player",
			eventType: "healing_done",
			message: "Healing resolves.",
			outcome: { type: "healing", targetId: "hero", amount },
		};
		const classes = getCombatLogEntryClassName(outcome, false).split(" ");
		expect(classes).toContain(amount > 0 ? "text-healing" : "text-text-muted");
		expect(classes).not.toContain("mt-2");
	});
});
