import type { ContentType, LoadedContent, ReferenceRule } from "./types";
import { toRelativeDisplayPath } from "./paths";

export function validateContentGraph(entries: readonly LoadedContent[], rootDir: string) {
	const errors = [
		...validateDuplicateIds(entries, rootDir),
		...validateReferenceRules(entries, rootDir),
	];

	if (errors.length > 0) {
		throw new Error(["Content generation failed:", ...errors.map((e) => `- ${e}`)].join("\n"));
	}
}

function validateDuplicateIds(entries: readonly LoadedContent[], rootDir: string) {
	const firstByTypeAndId = new Map<string, LoadedContent>();
	const errors: string[] = [];

	for (const entry of entries) {
		const key = `${entry.spec.type}:${entry.id}`;
		const first = firstByTypeAndId.get(key);

		if (first) {
			errors.push(
				`duplicate ${entry.spec.type} id ${JSON.stringify(entry.id)} in ${formatFile(
					entry.file,
					rootDir,
				)}; first seen in ${formatFile(first.file, rootDir)}`,
			);
			continue;
		}

		firstByTypeAndId.set(key, entry);
	}

	return errors;
}

function validateReferenceRules(entries: readonly LoadedContent[], rootDir: string) {
	const idsByType = new Map<ContentType, Set<string>>();
	const errors: string[] = [];

	for (const entry of entries) {
		const ids = idsByType.get(entry.spec.type) ?? new Set<string>();
		ids.add(entry.id);
		idsByType.set(entry.spec.type, ids);
	}

	for (const entry of entries) {
		for (const rule of entry.spec.referenceRules) {
			errors.push(...validateRule(entry, rule, idsByType, rootDir));
		}
	}

	return errors;
}

function validateRule(
	entry: LoadedContent,
	rule: ReferenceRule,
	idsByType: ReadonlyMap<ContentType, ReadonlySet<string>>,
	rootDir: string,
) {
	const targetIds = idsByType.get(rule.targetType) ?? new Set<string>();

	switch (rule.path) {
		case "combat.skillIds[]":
			return validateSkillRefs(entry, targetIds, rootDir);
		case "combat.featIds[]":
			return validateStringRefs(
				entry,
				entry.value.combat?.featIds ?? [],
				targetIds,
				"combat.featIds",
				rule.targetType,
				rootDir,
			);
		case "restrictedToClassIds[]":
			return validateStringRefs(
				entry,
				entry.value.restrictedToClassIds ?? [],
				targetIds,
				"restrictedToClassIds",
				rule.targetType,
				rootDir,
			);
		case "startingEquipment.*":
			return validateStartingEquipment(entry, targetIds, rule.targetType, rootDir);
		case "classId":
			return validateStringRefs(
				entry,
				entry.value.classId ? [entry.value.classId] : [],
				targetIds,
				"classId",
				rule.targetType,
				rootDir,
			);
		case "additionalSkillIds[]":
			return validateStringRefs(
				entry,
				entry.value.additionalSkillIds ?? [],
				targetIds,
				"additionalSkillIds",
				rule.targetType,
				rootDir,
			);
		case "featIds[]":
			return validateStringRefs(
				entry,
				entry.value.featIds ?? [],
				targetIds,
				"featIds",
				rule.targetType,
				rootDir,
			);
		case "equipment.*.baseId":
			return validateSystemGhostEquipment(entry, targetIds, rule.targetType, rootDir);
	}
}

function validateSystemGhostEquipment(
	entry: LoadedContent,
	targetIds: ReadonlySet<string>,
	targetType: ContentType,
	rootDir: string,
) {
	const errors: string[] = [];
	for (const [slot, recipe] of Object.entries(entry.value.equipment ?? {})) {
		if (recipe?.baseId && !targetIds.has(recipe.baseId)) {
			errors.push(
				`${formatFile(entry.file, rootDir)} equipment.${slot}.baseId references missing ${targetType} ${JSON.stringify(recipe.baseId)}`,
			);
		}
	}
	return errors;
}

function validateSkillRefs(entry: LoadedContent, targetIds: ReadonlySet<string>, rootDir: string) {
	const errors: string[] = [];
	const skillIds = entry.value.combat?.skillIds ?? [];

	for (const [idx, ref] of skillIds.entries()) {
		if (!targetIds.has(ref)) {
			errors.push(
				`${formatFile(entry.file, rootDir)} combat.skillIds[${idx}] references missing skill ${JSON.stringify(
					ref,
				)}`,
			);
		}
	}

	return errors;
}

function validateStringRefs(
	entry: LoadedContent,
	refs: readonly string[],
	targetIds: ReadonlySet<string>,
	path: string,
	targetType: ContentType,
	rootDir: string,
) {
	const errors: string[] = [];

	for (const [idx, id] of refs.entries()) {
		if (!targetIds.has(id)) {
			errors.push(
				`${formatFile(entry.file, rootDir)} ${path}[${idx}] references missing ${targetType} ${JSON.stringify(
					id,
				)}`,
			);
		}
	}

	return errors;
}

function validateStartingEquipment(
	entry: LoadedContent,
	targetIds: ReadonlySet<string>,
	targetType: ContentType,
	rootDir: string,
) {
	const errors: string[] = [];
	const equipment = entry.value.startingEquipment;

	if (!equipment) {
		return errors;
	}

	for (const [slot, id] of Object.entries(equipment)) {
		if (id !== undefined && !targetIds.has(id)) {
			errors.push(
				`${formatFile(entry.file, rootDir)} startingEquipment.${slot} references missing ${targetType} ${JSON.stringify(
					id,
				)}`,
			);
		}
	}

	return errors;
}

function formatFile(file: string, rootDir: string) {
	return toRelativeDisplayPath(rootDir, file);
}
