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
	it("names the killer while retaining readable older death entries", () => {
		expect(
			describeWorldLogEvent({
				...entry(1),
				event: { type: "hero_died", battleNumber: 12, enemyName: "Ghost of Mira" },
			}).text,
		).toBe("was slain by Ghost of Mira in battle 12.");
		expect(
			describeWorldLogEvent({ ...entry(1), event: { type: "hero_died", battleNumber: 12 } })
				.text,
		).toBe("fell in battle 12.");
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
			text: "defeated Dragon and conquered battle 100!",
			colour: "text-primary",
			trophy: true,
		});
	});
});
