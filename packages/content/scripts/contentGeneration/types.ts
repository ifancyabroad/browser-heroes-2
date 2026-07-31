export type ContentType =
	| "skill"
	| "enemy"
	| "item"
	| "itemBase"
	| "itemAffix"
	| "class"
	| "feat"
	| "achievement";

export type ReferencePath = "combat.skillIds[]" | "combat.featIds[]" | "startingEquipment.*";

export type ReferenceRule = {
	path: ReferencePath;
	targetType: ContentType;
};

export type ContentSpec = {
	type: ContentType;
	typeName: string;
	plural: string;
	dirName: string;
	importPrefix: string;
	definitionType: string;
	definitionImportPath: string;
	typeImportLines: readonly string[];
	helperTypeNames: readonly string[];
	typeExpression: string;
	referenceRules: readonly ReferenceRule[];
};

export type ContentValue = {
	id: string;
	combat?: {
		skillIds?: readonly string[];
		featIds?: readonly string[];
	};
	startingEquipment?: Record<string, string | undefined>;
};

export type LoadedContent = {
	spec: ContentSpec;
	file: string;
	importName: string;
	id: string;
	value: ContentValue;
};
