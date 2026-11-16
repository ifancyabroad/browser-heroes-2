import { Schema, model } from "mongoose";
import type { AdminActivityEntry } from "@app/shared";

export type AdminActivityRecord = Omit<AdminActivityEntry, "id" | "createdAt"> & {
	sourceKey: string;
	createdAt: Date;
};
const schema = new Schema<AdminActivityRecord>({
	sourceKey: { type: String, required: true, unique: true },
	createdAt: { type: Date, required: true },
	runId: { type: String, required: true },
	heroName: { type: String, required: true },
	classId: { type: String, required: true },
	mode: { type: String, required: true, enum: ["normal", "dailyChallenge"] },
	displayName: { type: String, default: null },
	event: { type: Schema.Types.Mixed, required: true },
});
schema.index({ createdAt: -1, _id: -1 });
export const AdminActivityModel = model("AdminActivity", schema);
