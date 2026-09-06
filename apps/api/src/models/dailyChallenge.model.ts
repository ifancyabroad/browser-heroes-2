import { Schema, model } from "mongoose";
import { classIds } from "@app/content";

const dailyChallengeSchema = new Schema(
	{
		season: { type: Number, required: true, min: 1, immutable: true },
		date: { type: String, required: true, unique: true },
		seed: { type: String, required: true },
		classId: { type: String, enum: classIds, required: true },
	},
	{ timestamps: true },
);

export const DailyChallengeModel = model("DailyChallenge", dailyChallengeSchema);
