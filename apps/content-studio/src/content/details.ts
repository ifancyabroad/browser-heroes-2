import type {
	BasicAttack,
	Class,
	Enemy,
	Feat,
	Item,
	ItemAffix,
	ItemAffixApplicabilityRule,
	ItemBase,
	Skill,
	SystemGhost,
} from "@app/content";
import type { CatalogEntry, CategoryKey } from "./catalog";
import { formatLabel } from "./presentation";

export type DetailFact = { label: string; value: string | number | readonly string[] };
export type EntryLink = { category: CategoryKey; id: string; label?: string; detail?: string };
export type DetailSection = { id: string; title: string } & (
	| { kind: "facts"; facts: DetailFact[] }
	| {
			kind: "profile";
			facts: DetailFact[];
			attributes: Enemy["attributes"];
			attributeLabel: string;
	  }
	| { kind: "attack"; attack: BasicAttack }
	| { kind: "links"; links: EntryLink[] }
	| { kind: "applicability"; rules: readonly ItemAffixApplicabilityRule[] }
	| { kind: "mechanics"; field: string; value: unknown }
);
export type DetailPresentation = {
	badges: string[];
	summary: DetailFact[];
	sections: DetailSection[];
	additional: [string, unknown][];
	descriptionLabel?: string;
};

const identityKeys = ["id", "name", "description", "icon", "portrait", "enemyPortrait", "iconPool"];
const labels = (values: readonly string[]) => values.map(formatLabel);
const facts = (id: string, title: string, values: DetailFact[]): DetailSection => ({
	id,
	title,
	kind: "facts",
	facts: values.filter(({ value }) => !Array.isArray(value) || value.length > 0),
});
const links = (
	id: string,
	title: string,
	category: CategoryKey,
	ids: readonly string[],
): DetailSection => ({ id, title, kind: "links", links: ids.map((id) => ({ category, id })) });
const mechanics = (field: string, title: string, value: readonly unknown[]): DetailSection => ({
	id: `definition-${field}`,
	title,
	kind: "mechanics",
	field,
	value,
});

// These are authored properties, regrouped for review. No combat stats are calculated here.
export function getDetailPresentation(
	category: CategoryKey,
	entry: CatalogEntry,
): DetailPresentation {
	function view(
		handled: string[],
		summary: DetailFact[],
		sections: DetailSection[],
		badges: string[] = [],
		secondary: [string, unknown][] = [],
	): DetailPresentation {
		const handledKeys = new Set([...identityKeys, ...handled]);
		return {
			badges,
			summary,
			sections: sections.filter((section) => {
				if (section.kind === "links") {
					return section.links.length > 0;
				}
				if (section.kind === "facts") {
					return section.facts.length > 0;
				}
				if (section.kind === "mechanics" && Array.isArray(section.value)) {
					return section.value.length > 0;
				}
				return true;
			}),
			additional: [
				...secondary,
				...Object.entries(entry.definition).filter(
					([key, value]) =>
						!handledKeys.has(key) &&
						value !== undefined &&
						value !== null &&
						value !== "" &&
						(!Array.isArray(value) || value.length > 0),
				),
			],
		};
	}
	switch (category) {
		case "skills": {
			const skill = entry.definition as Skill;
			return view(
				["kind", "pool", "rarity", "maxUses", "category", "effects"],
				[
					{ label: "Kind", value: formatLabel(skill.kind) },
					{ label: "Pool", value: formatLabel(skill.pool) },
					{ label: "Rarity", value: formatLabel(skill.rarity) },
					{ label: "Maximum uses", value: skill.maxUses ?? "Unlimited" },
				],
				[mechanics("effects", "Effects", skill.effects)],
				[formatLabel(skill.category)],
			);
		}
		case "enemies": {
			const enemy = entry.definition as Enemy;
			return view(
				[
					"rank",
					"threat",
					"encounter",
					"attributes",
					"combat",
					"proficiencies",
					"shortName",
				],
				[
					{ label: "Zone", value: formatLabel(enemy.encounter.zone) },
					{ label: "Threat", value: enemy.threat },
				],
				[
					{
						id: "combat-profile",
						title: "Combat profile",
						kind: "profile",
						attributes: enemy.attributes,
						attributeLabel: "Attributes",
						facts: [
							{ label: "Hit die", value: enemy.combat.hitDie },
							{ label: "Armour class", value: enemy.combat.armourClass },
							{ label: "Initiative", value: enemy.combat.initiative },
							{ label: "Tactic", value: formatLabel(enemy.combat.tactic) },
							{
								label: "Saving throw proficiencies",
								value: labels(enemy.proficiencies.savingThrows),
							},
						].filter(({ value }) => !Array.isArray(value) || value.length > 0),
					},
					{
						id: "basic-attack",
						title: "Basic attack",
						kind: "attack",
						attack: enemy.combat.basicAttack,
					},
					links("skills", "Skills", "skills", enemy.combat.skillIds),
					links("feats", "Feats", "feats", enemy.combat.featIds),
					facts(
						"damage-affinities",
						"Damage affinities",
						Object.entries(enemy.combat.damageAffinities).map(([label, value]) => ({
							label: formatLabel(label),
							value: labels(value),
						})),
					),
				],
				[formatLabel(enemy.rank)],
				[
					["shortName", enemy.shortName],
					["encounterWeight", enemy.encounter.weight],
				],
			);
		}
		case "classes": {
			const gameClass = entry.definition as Class;
			return view(
				["attributes", "combat", "proficiencies", "skillPoolIds", "startingEquipment"],
				[
					{ label: "Hit die", value: gameClass.combat.hitDie },
					{ label: "Tactic", value: formatLabel(gameClass.combat.tactic) },
					{ label: "Skill pools", value: labels(gameClass.skillPoolIds) },
				],
				[
					{
						id: "class-profile",
						title: "Class profile",
						kind: "profile",
						attributes: gameClass.attributes,
						attributeLabel: "Starting attributes",
						facts: [
							{ label: "Armour", value: labels(gameClass.proficiencies.armourTypes) },
							{
								label: "Saving throws",
								value: labels(gameClass.proficiencies.savingThrows),
							},
							{
								label: "Weapons",
								value: labels(gameClass.proficiencies.weaponTypes),
							},
						].filter(({ value }) => !Array.isArray(value) || value.length > 0),
					},
					links("skills", "Starting skills", "skills", gameClass.combat.skillIds),
					links("feats", "Starting feats", "feats", gameClass.combat.featIds),
					{
						id: "equipment",
						title: "Starting equipment",
						kind: "links",
						links: Object.entries(gameClass.startingEquipment ?? {}).flatMap(
							([slot, id]) =>
								id
									? [
											{
												category: "item-bases" as const,
												id,
												label: formatLabel(slot),
											},
										]
									: [],
						),
					},
				],
			);
		}
		case "system-ghosts": {
			const ghost = entry.definition as SystemGhost;
			return view(
				[
					"classId",
					"encounterLevel",
					"heroLevel",
					"additionalSkillIds",
					"featIds",
					"equipment",
				],
				[
					{ label: "Encounter level", value: ghost.encounterLevel },
					{ label: "Hero level", value: ghost.heroLevel },
				],
				[
					links("class", "Class", "classes", [ghost.classId]),
					{
						id: "equipment",
						title: "Equipment recipes",
						kind: "links",
						links: Object.entries(ghost.equipment).map(([slot, recipe]) => ({
							category: "item-bases",
							id: recipe.baseId,
							label: formatLabel(slot),
							detail: formatLabel(recipe.rarity),
						})),
					},
					links("skills", "Additional skills", "skills", ghost.additionalSkillIds),
					links("feats", "Feats", "feats", ghost.featIds),
				],
			);
		}
		case "feats": {
			const feat = entry.definition as Feat;
			return view(
				["kind", "category", "modifiers", "attackRiders"],
				[{ label: "Kind", value: formatLabel(feat.kind) }],
				[
					mechanics("modifiers", "Passive modifiers", feat.modifiers),
					mechanics("attackRiders", "Attack riders", feat.attackRiders),
				],
				[formatLabel(feat.category)],
			);
		}
		case "item-bases":
		case "items": {
			const item = entry.definition as Item | ItemBase;
			const summary: DetailFact[] = [
				{ label: "Type", value: formatLabel(item.type) },
				{
					label: "basePrice" in item ? "Base price" : "Price",
					value: "basePrice" in item ? item.basePrice : item.price,
				},
			];
			const sections: DetailSection[] = [];
			if (item.type === "weapon") {
				summary.unshift({
					label: "Damage",
					value: `${item.damage.dice} ${item.damage.type}`,
				});
				sections.push(
					facts("weapon-profile", "Weapon profile", [
						{ label: "Weapon type", value: formatLabel(item.weaponType) },
						{ label: "Handedness", value: formatLabel(item.handedness) },
						{ label: "Range", value: formatLabel(item.attackRange) },
						{ label: "Damage class", value: formatLabel(item.damage.damageClass) },
						{ label: "Damage attribute", value: formatLabel(item.damage.attribute) },
					]),
				);
			} else {
				if ("armourClass" in item) {
					summary.unshift({ label: "Armour class", value: item.armourClass });
				}
				summary.push({ label: "Slot", value: formatLabel(item.slot) });
				if ("category" in item) {
					summary.push({ label: "Armour category", value: formatLabel(item.category) });
				}
			}
			if ("restrictedToClassIds" in item && item.restrictedToClassIds) {
				sections.push(
					links(
						"class-restrictions",
						"Class restrictions",
						"classes",
						item.restrictedToClassIds,
					),
				);
			}
			if ("modifiers" in item) {
				sections.push(mechanics("modifiers", "Passive modifiers", item.modifiers));
			}
			if ("attackRiders" in item) {
				sections.push(mechanics("attackRiders", "Attack riders", item.attackRiders));
			}
			return view(
				[
					"type",
					"price",
					"basePrice",
					"slot",
					"category",
					"armourClass",
					"weaponType",
					"handedness",
					"attackRange",
					"damage",
					"rarity",
					"restrictedToClassIds",
					"modifiers",
					"attackRiders",
				],
				summary,
				sections,
				"rarity" in item ? [formatLabel(item.rarity)] : [],
			);
		}
		case "affixes": {
			const affix = entry.definition as ItemAffix;
			return view(
				["position", "rarity", "appliesTo", "modifiers", "attackRiders"],
				[
					{ label: "Position", value: formatLabel(affix.position) },
					{ label: "Rarity", value: formatLabel(affix.rarity) },
				],
				[
					{
						id: "applicability",
						title: "Applies to",
						kind: "applicability",
						rules: affix.appliesTo,
					},
					mechanics("modifiers", "Passive modifiers", affix.modifiers),
					mechanics("attackRiders", "Attack riders", affix.attackRiders),
				],
			);
		}
		case "achievements":
			return { ...view([], [], []), descriptionLabel: "Unlock requirement" };
	}
}
