import { Schema, model } from "mongoose";
import type { WorldLogEntry } from "@app/shared";

export type WorldLogRecord = Omit<WorldLogEntry, "id" | "createdAt"> & {
	sourceKey: string;
	createdAt: Date;
};

const schema = new Schema<WorldLogRecord>({
	sourceKey: { type: String, required: true, unique: true },
	createdAt: { type: Date, required: true },
	heroName: { type: String, required: true },
	classId: { type: String, required: true },
	displayName: { type: String, default: null },
	mode: { type: String, required: true, enum: ["normal", "dailyChallenge"] },
	event: { type: Schema.Types.Mixed, required: true },
});

schema.index({ createdAt: -1, _id: -1 });

export const WorldLogModel = model("WorldLog", schema);
