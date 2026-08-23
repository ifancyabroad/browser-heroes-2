import { Schema, model } from "mongoose";
import { classIds } from "@app/content";

const dailyChallengeSchema = new Schema(
	{
		date: { type: String, required: true, unique: true },
		seed: { type: String, required: true },
		classId: { type: String, enum: classIds, required: true },
	},
	{ timestamps: true },
);

export const DailyChallengeModel = model("DailyChallenge", dailyChallengeSchema);
