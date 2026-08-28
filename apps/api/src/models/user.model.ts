import { classIds } from "@app/content";
import { Schema, model, type InferSchemaType } from "mongoose";

const lifetimeStatsSchema = new Schema(
	{
		kills: { type: Number, required: true, default: 0, min: 0 },
		bossesDefeated: { type: Number, required: true, default: 0, min: 0 },
		ghostsDefeated: { type: Number, required: true, default: 0, min: 0 },
		goldEarned: { type: Number, required: true, default: 0, min: 0 },
		legendaryItemsAcquired: { type: Number, required: true, default: 0, min: 0 },
		gamesCompleted: { type: Number, required: true, default: 0, min: 0 },
		healingPotionsUsed: { type: Number, required: true, default: 0, min: 0 },
		completedGameClassIds: [{ type: String, enum: classIds }],
	},
	{ _id: false },
);

const userSchema = new Schema(
	{
		type: {
			type: String,
			enum: ["guest", "registered"],
			required: true,
			default: "guest",
		},
		displayName: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
		},
		passwordHash: {
			type: String,
			select: false,
		},
		registeredAt: Date,
		lastActiveAt: {
			type: Date,
			required: true,
			default: Date.now,
		},
		lifetimeStats: {
			type: lifetimeStatsSchema,
			required: true,
			default: () => ({}),
		},
	},
	{
		timestamps: true,
	},
);

userSchema.index(
	{ email: 1 },
	{
		unique: true,
		partialFilterExpression: {
			type: "registered",
			email: { $type: "string" },
		},
	},
);
userSchema.index({ type: 1, lastActiveAt: 1 });
userSchema.index({ createdAt: 1 });

export type UserDocument = InferSchemaType<typeof userSchema>;

export const UserModel = model("User", userSchema);
