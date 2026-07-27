import { Schema, model, type InferSchemaType } from "mongoose";

const authTokenSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		purpose: {
			type: String,
			enum: ["reset-password"],
			required: true,
		},
		tokenHash: {
			type: String,
			required: true,
			unique: true,
		},
		expiresAt: {
			type: Date,
			required: true,
		},
		usedAt: Date,
	},
	{ timestamps: true },
);

authTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
authTokenSchema.index({ userId: 1, purpose: 1, createdAt: -1 });

export type AuthTokenDocument = InferSchemaType<typeof authTokenSchema>;
export const AuthTokenModel = model("AuthToken", authTokenSchema);
