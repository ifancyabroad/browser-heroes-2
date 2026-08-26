export type ContentType =
	| "skill"
	| "enemy"
	| "item"
	| "itemBase"
	| "itemAffix"
	| "class"
	| "feat"
	| "achievement"
	| "systemGhost";

export type ReferencePath =
	| "combat.skillIds[]"
	| "combat.featIds[]"
	| "restrictedToClassIds[]"
	| "startingEquipment.*"
	| "classId"
	| "additionalSkillIds[]"
	| "featIds[]"
	| "equipment.*.baseId";

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
	registryConstantName?: string;
	referenceRules: readonly ReferenceRule[];
};

export type ContentValue = {
	id: string;
	combat?: {
		skillIds?: readonly string[];
		featIds?: readonly string[];
	};
	restrictedToClassIds?: readonly string[];
	startingEquipment?: Record<string, string | undefined>;
	classId?: string;
	additionalSkillIds?: readonly string[];
	featIds?: readonly string[];
	equipment?: Record<string, { baseId?: string } | undefined>;
};

export type LoadedContent = {
	spec: ContentSpec;
	file: string;
	importName: string;
	id: string;
	value: ContentValue;
};
