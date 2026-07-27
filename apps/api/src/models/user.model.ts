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

export type UserDocument = InferSchemaType<typeof userSchema>;

export const UserModel = model("User", userSchema);
