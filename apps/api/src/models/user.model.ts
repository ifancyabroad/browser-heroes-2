import { Schema, model, type InferSchemaType } from "mongoose";

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
	},
	{
		timestamps: true,
	},
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const UserModel = model("User", userSchema);
