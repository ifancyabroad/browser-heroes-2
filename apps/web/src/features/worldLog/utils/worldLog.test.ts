import { describe, expect, it } from "vitest";
import type { WorldLogEntry } from "@app/shared";
import { describeWorldLogEvent } from "./describeWorldLogEvent";
import { mergeWorldLogEntries } from "./mergeWorldLogEntries";

const entry = (id: number): WorldLogEntry => ({
	id: String(id).padStart(3, "0"),
	createdAt: "2026-01-01T00:00:00.000Z",
	heroName: "Hero",
	classId: "warrior",
	displayName: null,
	mode: "normal",
	event: { type: "hero_created" },
});

describe("world log presentation", () => {
	it("shows the new day after rest in normal text", () => {
		expect(
			describeWorldLogEvent({ ...entry(1), event: { type: "hero_rested", day: 3 } }),
		).toEqual({
			text: "rested in town to begin day 3",
			colour: "text-text",
		});
	});

	it("names the killer with a compact battle number suffix", () => {
		expect(
			describeWorldLogEvent({
				...entry(1),
				event: {
					type: "hero_died",
					battleNumber: 12,
					enemyName: "Fallen Warrior Mira",
					encounterType: "ghost",
				},
			}).text,
		).toBe("was slain by Fallen Warrior Mira (battle 12)");
	});

	it.each([
		["standard", "Goblin", "a Goblin"],
		["standard", "Orc", "an Orc"],
		["boss", "Aetheris the Dawnflame", "Aetheris the Dawnflame"],
		["ghost", "Fallen Warrior Bob", "Fallen Warrior Bob"],
	] as const)(
		"uses the appropriate article for %s enemies: %s",
		(encounterType, enemyName, killer) => {
			expect(
				describeWorldLogEvent({
					...entry(1),
					event: { type: "hero_died", battleNumber: 12, enemyName, encounterType },
				}),
			).toEqual({ text: `was slain by ${killer} (battle 12)`, colour: "text-error" });
		},
	);

	it("uses grey for ordinary boss victories and the dedicated ghost colour for banishments", () => {
		expect(
			describeWorldLogEvent({
				...entry(1),
				event: {
					type: "boss_defeated",
					enemyName: "Dragon",
					battleNumber: 10,
					finalBoss: false,
				},
			}),
		).toEqual({ text: "defeated Dragon (battle 10)", colour: "text-text" });
		expect(
			describeWorldLogEvent({
				...entry(1),
				event: { type: "ghost_banished", enemyName: "Fallen Warrior Bob" },
			}),
		).toEqual({ text: "banished Fallen Warrior Bob", colour: "text-[#b8a9e8]" });
	});

	it("merges overlapping fetches and socket arrivals with deterministic ordering and a 50-entry cap", () => {
		const history = Array.from({ length: 55 }, (_, index) => entry(index));
		const merged = mergeWorldLogEntries(history.reverse(), [entry(54), entry(55)]);
		expect(merged).toHaveLength(50);
		expect(merged[0].id).toBe("006");
		expect(merged.at(-1)?.id).toBe("055");
	});

	it("uses legendary colour and a distinct final boss announcement", () => {
		expect(
			describeWorldLogEvent({
				...entry(1),
				event: { type: "legendary_acquired", itemName: "Relic" },
			}),
		).toMatchObject({ colour: "text-legendary" });
		expect(
			describeWorldLogEvent({
				...entry(1),
				event: {
					type: "boss_defeated",
					enemyName: "Dragon",
					battleNumber: 100,
					finalBoss: true,
				},
			}),
		).toEqual({
			text: "defeated Dragon and completed all 100 battles!",
			colour: "text-primary",
			trophy: true,
		});
	});
});
