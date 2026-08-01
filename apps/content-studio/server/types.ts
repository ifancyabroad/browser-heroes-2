export type StudioCategory =
	| "enemies"
	| "skills"
	| "feats"
	| "classes"
	| "item-bases"
	| "affixes"
	| "items"
	| "achievements";

export type Draft = Record<string, unknown>;

export type FieldIssue = { path: string; message: string };

export type ApiErrorCode =
	| "notFound"
	| "unsupportedSource"
	| "conflict"
	| "validation"
	| "invalidReference"
	| "invalidAsset"
	| "writeFailed";

export type ApiError = {
	error: { code: ApiErrorCode; message: string; issues?: FieldIssue[] };
};
