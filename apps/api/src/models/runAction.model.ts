import { model, Schema, type InferSchemaType } from "mongoose";

const runActionSchema = new Schema(
	{
		runId: {
			type: Schema.Types.ObjectId,
			ref: "Run",
			required: true,
			index: true,
		},

		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},

		sequence: {
			type: Number,
			required: true,
			min: 1,
		},

		action: {
			type: Schema.Types.Mixed,
			required: true,
		},

		externalInput: {
			type: Schema.Types.Mixed,
			required: true,
		},

		success: {
			type: Boolean,
			required: true,
		},

		error: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

runActionSchema.index(
	{
		runId: 1,
		sequence: 1,
	},
	{
		unique: true,
	},
);
runActionSchema.index({ createdAt: 1, userId: 1 });

export type RunActionDocument = InferSchemaType<typeof runActionSchema>;

export const RunActionModel = model("RunAction", runActionSchema);
