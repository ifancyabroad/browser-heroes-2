import { achievementIds } from "@app/content";
import { model, Schema, type InferSchemaType } from "mongoose";

const achievementUnlockSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		achievementId: {
			type: String,
			enum: achievementIds,
			required: true,
		},
		unlockedAt: {
			type: Date,
			required: true,
			default: Date.now,
		},
		runId: {
			type: Schema.Types.ObjectId,
			ref: "Run",
		},
		combatId: String,
		ghostId: {
			type: Schema.Types.ObjectId,
			ref: "Ghost",
		},
	},
	{
		timestamps: true,
	},
);

achievementUnlockSchema.index({ userId: 1, achievementId: 1 }, { unique: true });
achievementUnlockSchema.index({ userId: 1, unlockedAt: 1 });

export type AchievementUnlockDocument = InferSchemaType<typeof achievementUnlockSchema>;

export const AchievementUnlockModel = model("AchievementUnlock", achievementUnlockSchema);
