import type { Class, Enemy, SystemGhost } from "@app/content";
import { catalogs, type CatalogEntry, type CategoryKey } from "./catalog";

export type ContentReference = {
	category: CategoryKey;
	id: string;
	name: string;
	relation: string;
};

const entryLookup = new Map<string, CatalogEntry>();

for (const catalog of catalogs) {
	for (const entry of catalog.entries) {
		entryLookup.set(`${catalog.key}:${entry.id}`, entry);
	}
}

function reference(category: CategoryKey, id: string, relation: string): ContentReference | null {
	const entry = entryLookup.get(`${category}:${id}`);
	return entry ? { category, id, name: entry.name, relation } : null;
}

export function getOutgoingReferences(category: CategoryKey, entry: CatalogEntry) {
	const references: (ContentReference | null)[] = [];

	if (category === "enemies") {
		const enemy = entry.definition as Enemy;
		references.push(
			...enemy.combat.skillIds.map((id) => reference("skills", id, "Skill")),
			...enemy.combat.featIds.map((id) => reference("feats", id, "Feat")),
		);
	}

	if (category === "classes") {
		const gameClass = entry.definition as Class;
		references.push(
			...gameClass.combat.skillIds.map((id) => reference("skills", id, "Starting skill")),
			...gameClass.combat.featIds.map((id) => reference("feats", id, "Starting feat")),
			...Object.values(gameClass.startingEquipment ?? {}).map((id) =>
				id ? reference("item-bases", id, "Starting equipment") : null,
			),
		);
	}

	if (category === "system-ghosts") {
		const ghost = entry.definition as SystemGhost;
		references.push(
			reference("classes", ghost.classId, "Class"),
			...ghost.additionalSkillIds.map((id) => reference("skills", id, "Skill")),
			...ghost.featIds.map((id) => reference("feats", id, "Feat")),
			...Object.entries(ghost.equipment).map(([slot, recipe]) =>
				reference("item-bases", recipe.baseId, `Equipment (${slot})`),
			),
		);
	}

	return references.filter((value): value is ContentReference => value !== null);
}

export function getIncomingReferences(category: CategoryKey, id: string) {
	const incoming: ContentReference[] = [];

	for (const sourceCatalog of catalogs) {
		for (const source of sourceCatalog.entries) {
			if (
				getOutgoingReferences(sourceCatalog.key, source).some(
					(target) => target.category === category && target.id === id,
				)
			) {
				incoming.push({
					category: sourceCatalog.key,
					id: source.id,
					name: source.name,
					relation: sourceCatalog.singular,
				});
			}
		}
	}

	return incoming;
}
