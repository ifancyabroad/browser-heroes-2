import { Schema, model, type InferSchemaType } from "mongoose";
import { classIds } from "@app/content";

const ghostStatsSchema = new Schema(
	{
		kills: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
		},
		deaths: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
		},
		encounters: {
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

const ghostSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},

		sourceRunId: {
			type: Schema.Types.ObjectId,
			ref: "Run",
			required: true,
			unique: true,
			index: true,
		},

		name: {
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

		heroLevel: {
			type: Number,
			required: true,
			min: 1,
			index: true,
		},

		/**
		 * The zone/encounter level this ghost should appear at.
		 *
		 * Normal ghosts should be matched to this level.
		 * Endless encounters can pull from level 10 ghosts.
		 */
		encounterLevel: {
			type: Number,
			required: true,
			min: 1,
			max: 10,
			index: true,
		},

		/**
		 * Full snapshot used later to recreate this hero as a ghost encounter.
		 *
		 * Keep this flexible for now. The engine/content layer owns the exact
		 * hero/equipment/skill shape.
		 */
		snapshot: {
			type: Schema.Types.Mixed,
			required: true,
		},

		stats: {
			type: ghostStatsSchema,
			required: true,
			default: () => ({}),
		},
	},
	{
		timestamps: true,
		optimisticConcurrency: true,
	},
);

ghostSchema.index({ encounterLevel: 1, createdAt: -1 });
ghostSchema.index({ "stats.kills": -1, "stats.deaths": 1 });
ghostSchema.index({ userId: 1, createdAt: -1 });

export type GhostDocument = InferSchemaType<typeof ghostSchema>;

export const GhostModel = model("Ghost", ghostSchema);
