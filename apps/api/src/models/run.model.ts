import { Schema, model, type InferSchemaType } from "mongoose";
import { classIds } from "@app/content";

export const RUN_STATUSES = ["active", "dead", "retired", "abandoned"] as const;

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
			index: true,
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
			index: true,
		},
		zoneNumber: {
			type: Number,
			required: true,
			default: 1,
			min: 1,
			index: true,
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

		status: {
			type: String,
			enum: RUN_STATUSES,
			required: true,
			default: "active",
			index: true,
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
runSchema.index({
	status: 1,
	"summary.kills": -1,
	"summary.day": 1,
	completedAt: 1,
	_id: 1,
});
runSchema.index({
	userId: 1,
	"summary.kills": -1,
	"summary.day": 1,
	completedAt: 1,
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
