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

const ghostBanisherSchema = new Schema(
	{
		sourceId: {
			type: String,
			required: true,
		},
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
		heroLevel: {
			type: Number,
			required: true,
			min: 1,
		},
	},
	{ _id: false },
);

const ghostSchema = new Schema(
	{
		status: {
			type: String,
			enum: ["active", "banished"],
			required: true,
			default: "active",
		},

		banishedAt: {
			type: Date,
			default: null,
		},

		banishedBy: {
			type: ghostBanisherSchema,
			default: null,
		},

		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		sourceRunId: {
			type: Schema.Types.ObjectId,
			ref: "Run",
			required: true,
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
		},

		heroLevel: {
			type: Number,
			required: true,
			min: 1,
		},

		/**
		 * The cumulative zone in which the source hero died.
		 * This remains uncapped for ghosts created during endless progression.
		 */
		encounterLevel: {
			type: Number,
			required: true,
			min: 1,
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

ghostSchema.index({ sourceRunId: 1 }, { unique: true });

ghostSchema.index({ userId: 1, createdAt: -1 });
ghostSchema.index({ encounterLevel: 1, createdAt: -1, banishedAt: 1, _id: 1 });
ghostSchema.index({
	"stats.kills": -1,
	status: 1,
	createdAt: 1,
	_id: 1,
});
ghostSchema.index({
	classId: 1,
	"stats.kills": -1,
	status: 1,
	createdAt: 1,
	_id: 1,
});

ghostSchema.pre("validate", function () {
	if (this.status === "active" && (this.banishedAt || this.banishedBy)) {
		throw new Error("Active ghosts cannot have banishment metadata.");
	}
	if (this.status === "banished" && !this.banishedAt) {
		throw new Error("Banished ghosts require a banishment timestamp.");
	}
});

export type GhostDocument = InferSchemaType<typeof ghostSchema>;

export const GhostModel = model("Ghost", ghostSchema);
