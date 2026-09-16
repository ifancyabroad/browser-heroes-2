import { enemyIdSchema, type EnemyId } from "@app/content";
import type { EngineEvent } from "@app/engine";
import type { GetBestiaryResponse } from "@app/shared";
import type { ClientSession } from "mongoose";
import { BestiaryModel } from "../models/bestiary.model";

export async function getBestiary(userId: string): Promise<GetBestiaryResponse> {
	const records = await BestiaryModel.find({ userId }).lean();
	const entries = records.flatMap((record) => {
		const enemyId = enemyIdSchema.safeParse(record.enemyId);
		if (!enemyId.success) {
			return [];
		}

		return [
			{
				enemyId: enemyId.data,
				encounters: record.encounters,
				victories: record.victories,
				deaths: record.deaths,
			},
		];
	});

	return { entries };
}

export async function recordBestiaryEncounter(input: {
	userId: string;
	enemyId: EnemyId;
	session: ClientSession;
}): Promise<void> {
	await BestiaryModel.updateOne(
		{ userId: input.userId, enemyId: input.enemyId },
		{ $inc: { encounters: 1 } },
		{ upsert: true, session: input.session },
	);
}

export async function recordBestiaryProgress(input: {
	userId: string;
	events: readonly EngineEvent[];
	session: ClientSession;
}): Promise<void> {
	for (const event of input.events) {
		if (event.type !== "COMBAT_STARTED" && event.type !== "COMBAT_ENDED") {
			continue;
		}
		if (event.encounterType === "ghost") {
			continue;
		}

		const enemyId = enemyIdSchema.parse(event.enemySourceId);
		if (event.type === "COMBAT_STARTED") {
			await recordBestiaryEncounter({
				userId: input.userId,
				enemyId,
				session: input.session,
			});
			continue;
		}

		const counter = event.outcome === "victory" ? "victories" : "deaths";
		await BestiaryModel.updateOne(
			{ userId: input.userId, enemyId },
			{ $inc: { [counter]: 1 } },
			{ session: input.session },
		);
	}
}
