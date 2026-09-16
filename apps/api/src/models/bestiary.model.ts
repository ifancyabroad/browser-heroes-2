import { enemyIds } from "@app/content";
import { model, Schema, type InferSchemaType } from "mongoose";

const bestiarySchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	enemyId: {
		type: String,
		enum: enemyIds,
		required: true,
	},
	encounters: {
		type: Number,
		required: true,
		default: 0,
		min: 0,
	},
	victories: {
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
});

bestiarySchema.index({ userId: 1, enemyId: 1 }, { unique: true });

export type BestiaryDocument = InferSchemaType<typeof bestiarySchema>;

export const BestiaryModel = model("Bestiary", bestiarySchema);
