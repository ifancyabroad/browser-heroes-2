import { Schema, model, type InferSchemaType } from "mongoose";
import { classIds } from "@app/content";
import { runModes } from "@app/shared";

export const RUN_STATUSES = ["active", "dead", "retired", "abandoned"] as const;

const runSlainBySchema = new Schema(
	{
		sourceId: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		encounterType: {
			type: String,
			enum: ["standard", "boss", "ghost"],
			required: true,
		},
	},
	{
		_id: false,
	},
);

const runSummarySchema = new Schema(
	{
		heroName: {
			type: String,
			required: true,
			trim: true,
		},
		classId: {
			type: String,
			enum: classIds,
			required: true,
		},
		level: {
			type: Number,
			required: true,
			default: 1,
			min: 1,
		},
		battleNumber: {
			type: Number,
			required: true,
			default: 1,
			min: 1,
		},
		zoneNumber: {
			type: Number,
			required: true,
			default: 1,
			min: 1,
		},
		endlessCycle: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
		},
		day: {
			type: Number,
			required: true,
			default: 1,
			min: 1,
		},
		kills: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
		},
		hasDefeatedFinalBoss: {
			type: Boolean,
			required: true,
			default: false,
		},
		slainBy: {
			type: runSlainBySchema,
			default: null,
		},
	},
	{
		_id: false,
	},
);

const runSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		mode: {
			type: String,
			enum: runModes,
			required: true,
			default: "normal",
		},
		dailyChallengeDate: {
			type: String,
			match: /^\d{4}-\d{2}-\d{2}$/,
			required(this: { mode: string }) {
				return this.mode === "dailyChallenge";
			},
			validate: {
				validator(this: { mode: string }, value?: string) {
					return this.mode === "dailyChallenge" || value === undefined;
				},
				message: "Daily Challenge runs require a challenge date; normal runs must omit it.",
			},
			default: undefined,
		},

		status: {
			type: String,
			enum: RUN_STATUSES,
			required: true,
			default: "active",
		},

		nextActionSequence: {
			type: Number,
			required: true,
			default: 1,
			min: 1,
		},

		/**
		 * Full engine-owned run state.
		 *
		 * Do not duplicate RunState as a Mongoose schema here.
		 * The engine owns the shape and validation of this object.
		 */
		state: {
			type: Schema.Types.Mixed,
			required: true,
		},

		/**
		 * Derived/indexed fields copied from state.
		 *
		 * These are not authoritative gameplay data.
		 * Regenerate these from RunState whenever state changes.
		 */
		summary: {
			type: runSummarySchema,
			required: true,
		},

		completedAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
		optimisticConcurrency: true,
	},
);

runSchema.index({ userId: 1, createdAt: -1 });
runSchema.index({ createdAt: 1 });
runSchema.index(
	{ userId: 1, dailyChallengeDate: 1 },
	{ unique: true, partialFilterExpression: { mode: "dailyChallenge" } },
);
runSchema.index({ mode: 1, dailyChallengeDate: 1, status: 1 });
runSchema.index({
	mode: 1,
	dailyChallengeDate: 1,
	status: 1,
	"summary.kills": -1,
	"summary.day": 1,
	completedAt: 1,
	_id: 1,
});
runSchema.index({
	"summary.kills": -1,
	"summary.day": 1,
	completedAt: 1,
	_id: 1,
});
runSchema.index({
	"summary.classId": 1,
	"summary.kills": -1,
	"summary.day": 1,
	completedAt: 1,
	_id: 1,
});

runSchema.index({
	userId: 1,
	status: 1,
	completedAt: -1,
	_id: 1,
});

runSchema.index(
	{ userId: 1 },
	{
		unique: true,
		partialFilterExpression: {
			status: "active",
		},
	},
);

export type RunDocument = InferSchemaType<typeof runSchema>;

export const RunModel = model("Run", runSchema);
