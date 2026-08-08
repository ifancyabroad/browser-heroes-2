import {
	achievements,
	classes,
	enemies,
	feats,
	itemAffixes,
	itemBases,
	items,
	skills,
	type Achievement,
	type Class,
	type Enemy,
	type Feat,
	type Item,
	type ItemAffix,
	type ItemBase,
	type Skill,
} from "@app/content";
import { modifierSummary, riderSummary } from "./summaries";

export type CategoryKey =
	| "enemies"
	| "skills"
	| "feats"
	| "classes"
	| "item-bases"
	| "affixes"
	| "items"
	| "achievements";

export type ContentDefinition =
	| Enemy
	| Skill
	| Feat
	| Class
	| ItemBase
	| ItemAffix
	| Item
	| Achievement;

export type CellValue = string | number;

export type CatalogEntry = {
	id: string;
	name: string;
	description?: string;
	images: readonly string[];
	searchText: string;
	facets: Readonly<Record<string, readonly string[]>>;
	cells: Readonly<Record<string, CellValue>>;
	definition: ContentDefinition;
};

export type CatalogColumn = {
	key: string;
	label: string;
	numeric?: boolean;
	wide?: boolean;
};

export type CatalogFilter = {
	key: string;
	label: string;
	options: readonly string[];
};

export type Catalog = {
	key: CategoryKey;
	label: string;
	singular: string;
	entries: readonly CatalogEntry[];
	columns: readonly CatalogColumn[];
	filters: readonly CatalogFilter[];
	hasImages: boolean;
	defaultSort: string;
};

const join = (values: readonly (string | number | undefined)[]) =>
	values.filter((value) => value !== undefined && value !== "").join(", ");

const unique = (values: readonly (string | undefined)[]) =>
	[...new Set(values.filter((value): value is string => Boolean(value)))].sort((a, b) =>
		a.localeCompare(b),
	);

const collectProperties = (value: unknown, keys: ReadonlySet<string>): string[] => {
	if (Array.isArray(value)) {
		return value.flatMap((item) => collectProperties(item, keys));
	}
	if (typeof value !== "object" || value === null) {
		return [];
	}
	return Object.entries(value).flatMap(([key, item]) => [
		...(keys.has(key) && typeof item === "string" ? [item] : []),
		...collectProperties(item, keys),
	]);
};

const hasPropertyValue = (value: unknown, key: string, expected?: unknown): boolean => {
	if (Array.isArray(value)) {
		return value.some((item) => hasPropertyValue(item, key, expected));
	}
	if (typeof value !== "object" || value === null) {
		return false;
	}
	return Object.entries(value).some(
		([itemKey, item]) =>
			(itemKey === key &&
				item !== undefined &&
				(expected === undefined || item === expected)) ||
			hasPropertyValue(item, key, expected),
	);
};

const describeEffects = (effects: readonly { type: string }[]) =>
	unique(collectProperties(effects, new Set(["type"])));

const effectDamageTypes = (effects: readonly unknown[]) =>
	unique(
		collectProperties(
			effects,
			new Set(["damageType", "damageTypeOverride", "extraDamageType"]),
		),
	);

const effectTargets = (effects: readonly unknown[]) =>
	unique(collectProperties(effects, new Set(["target"])));

const effectRollTypes = (effects: readonly unknown[]) =>
	unique(collectProperties(effects, new Set(["roll"])));

const effectRollModes = (effects: readonly unknown[]) =>
	unique(collectProperties(effects, new Set(["mode", "rollMode"])));

const effectDurations = (effects: readonly unknown[]) => {
	const durations: Array<{ unit: string; value: number }> = [];
	const visit = (value: unknown) => {
		if (Array.isArray(value)) {
			value.forEach(visit);
			return;
		}
		if (typeof value !== "object" || value === null) {
			return;
		}
		for (const [key, child] of Object.entries(value)) {
			if (
				key === "duration" &&
				typeof child === "object" &&
				child !== null &&
				"unit" in child &&
				typeof child.unit === "string" &&
				"value" in child &&
				typeof child.value === "number"
			) {
				durations.push({ unit: child.unit, value: child.value });
			}
			visit(child);
		}
	};
	visit(effects);
	return durations;
};

const durationSummary = (effects: readonly unknown[]) =>
	unique(effectDurations(effects).map(({ unit, value }) => `${value} ${unit}`));

const applicabilityRuleSummary = (rule: {
	itemTypes?: readonly string[];
	weaponTypes?: readonly string[];
	damageTypes?: readonly string[];
	armourSlots?: readonly string[];
	armourCategories?: readonly string[];
}) =>
	join([
		rule.itemTypes?.length ? `type: ${rule.itemTypes.join("/")}` : undefined,
		rule.weaponTypes?.length ? `weapon: ${rule.weaponTypes.join("/")}` : undefined,
		rule.damageTypes?.length ? `damage: ${rule.damageTypes.join("/")}` : undefined,
		rule.armourSlots?.length ? `slot: ${rule.armourSlots.join("/")}` : undefined,
		rule.armourCategories?.length ? `armour: ${rule.armourCategories.join("/")}` : undefined,
	]) || "all items";

const makeSearchText = (definition: ContentDefinition, extra: readonly string[] = []) =>
	join([
		definition.id,
		definition.name,
		"description" in definition ? definition.description : undefined,
		"tags" in definition ? definition.tags.join(" ") : undefined,
		...extra,
	]).toLocaleLowerCase();

const filterOptions = (entries: readonly CatalogEntry[], key: string) =>
	unique(entries.flatMap((entry) => entry.facets[key]));

const makeFilters = (
	entries: readonly CatalogEntry[],
	definitions: readonly { key: string; label: string }[],
): CatalogFilter[] =>
	definitions.map(({ key, label }) => ({ key, label, options: filterOptions(entries, key) }));

const enemyEntries: CatalogEntry[] = enemies.map((enemy) => {
	const attack = `${enemy.combat.basicAttack.damage.dice} ${enemy.combat.basicAttack.damage.type}`;
	return {
		id: enemy.id,
		name: enemy.name,
		description: enemy.description,
		images: [enemy.portrait],
		searchText: makeSearchText(enemy, [...enemy.combat.skillIds, ...enemy.combat.featIds]),
		facets: {
			zone: [enemy.encounter.zone],
			rank: [enemy.rank],
			tactic: [enemy.combat.tactic],
			damageType: [enemy.combat.basicAttack.damage.type],
		},
		cells: {
			name: enemy.name,
			id: enemy.id,
			zone: enemy.encounter.zone,
			rank: enemy.rank,
			threat: enemy.threat,
			battle: join([enemy.encounter.minBattle ?? "1", enemy.encounter.maxBattle ?? "∞"]),
			ac: enemy.combat.armourClass,
			hitDie: enemy.combat.hitDie,
			attack,
			tactic: enemy.combat.tactic,
			skills: join(enemy.combat.skillIds),
			feats: join(enemy.combat.featIds),
		},
		definition: enemy,
	};
});

const skillEntries: CatalogEntry[] = skills.map((skill) => {
	const effectTypes = describeEffects(skill.effects);
	const damageTypes = effectDamageTypes(skill.effects);
	const targets = effectTargets(skill.effects);
	const rollTypes = effectRollTypes(skill.effects);
	const rollModes = effectRollModes(skill.effects);
	const durations = durationSummary(skill.effects);
	const durationUnits = unique(effectDurations(skill.effects).map(({ unit }) => unit));
	const hasSave = hasPropertyValue(skill.effects, "save");
	const attackRoll = hasPropertyValue(skill.effects, "requiresAttackRoll", true);
	return {
		id: skill.id,
		name: skill.name,
		description: skill.description,
		images: [skill.icon],
		searchText: makeSearchText(skill, [
			skill.kind,
			skill.category,
			skill.rarity,
			...effectTypes,
			...damageTypes,
			...targets,
			...rollTypes,
			...rollModes,
			...durations,
		]),
		facets: {
			pool: [skill.pool],
			kind: [skill.kind],
			category: [skill.category],
			rarity: [skill.rarity],
			effect: effectTypes,
			damageType: damageTypes,
			target: targets,
			rollType: rollTypes,
			rollMode: rollModes,
			durationUnit: durationUnits,
		},
		cells: {
			name: skill.name,
			id: skill.id,
			pool: skill.pool,
			kind: skill.kind,
			category: skill.category,
			rarity: skill.rarity,
			uses: skill.maxUses ?? "∞",
			effects: join(effectTypes),
			targets: join(targets),
			rollTypes: join(rollTypes) || "—",
			rollModes: join(rollModes) || "—",
			durations: join(durations) || "—",
			damageTypes: join(damageTypes),
			checks:
				join([hasSave ? "save" : undefined, attackRoll ? "attack roll" : undefined]) || "—",
			tags: join(skill.tags),
		},
		definition: skill,
	};
});

const featEntries: CatalogEntry[] = feats.map((feat) => ({
	id: feat.id,
	name: feat.name,
	description: feat.description,
	images: [feat.icon],
	searchText: makeSearchText(feat, [
		feat.kind,
		feat.category,
		modifierSummary(feat.modifiers),
		riderSummary(feat.attackRiders),
	]),
	facets: {
		kind: [feat.kind],
		category: [feat.category],
		modifier: unique(feat.modifiers.map((modifier) => modifier.type)),
		timing: unique(feat.attackRiders.map((rider) => rider.timing)),
	},
	cells: {
		name: feat.name,
		id: feat.id,
		kind: feat.kind,
		category: feat.category,
		modifiers: modifierSummary(feat.modifiers) || "—",
		riders: riderSummary(feat.attackRiders) || "—",
		tags: join(feat.tags),
	},
	definition: feat,
}));

const classEntries: CatalogEntry[] = classes.map((gameClass) => ({
	id: gameClass.id,
	name: gameClass.name,
	description: gameClass.description,
	images: [gameClass.icon, gameClass.portrait, gameClass.enemyPortrait],
	searchText: makeSearchText(gameClass, [
		...gameClass.skillPoolIds,
		...gameClass.combat.skillIds,
		...gameClass.combat.featIds,
		...Object.values(gameClass.startingEquipment ?? {}).flatMap((value) =>
			value === undefined ? [] : [value],
		),
	]),
	facets: {
		pool: gameClass.skillPoolIds,
		tactic: [gameClass.combat.tactic],
		armour: gameClass.proficiencies.armourTypes,
		weapon: gameClass.proficiencies.weaponTypes,
	},
	cells: {
		order: gameClass.order,
		name: gameClass.name,
		id: gameClass.id,
		hitDie: gameClass.combat.hitDie,
		pools: join(gameClass.skillPoolIds),
		attributes: Object.entries(gameClass.attributes)
			.map(([key, value]) => `${key.slice(0, 3)} ${value}`)
			.join(", "),
		proficiencies: join([
			...gameClass.proficiencies.armourTypes,
			...gameClass.proficiencies.weaponTypes,
			...gameClass.proficiencies.savingThrows,
		]),
		skills: join(gameClass.combat.skillIds),
		feats: join(gameClass.combat.featIds),
		equipment: join(Object.values(gameClass.startingEquipment ?? {})),
	},
	definition: gameClass,
}));

const itemBaseEntries: CatalogEntry[] = itemBases.map((base) => {
	const subtype =
		base.type === "weapon" ? base.weaponType : "category" in base ? base.category : base.slot;
	const stat =
		base.type === "weapon"
			? `${base.damage.dice} ${base.damage.type}`
			: "armourClass" in base
				? `AC ${base.armourClass}`
				: "—";
	return {
		id: base.id,
		name: base.name,
		images: base.iconPool,
		searchText: makeSearchText(base, [subtype, stat]),
		facets: {
			type: [base.type],
			subtype: [subtype],
			damageType: base.type === "weapon" ? [base.damage.type] : [],
		},
		cells: {
			name: base.name,
			id: base.id,
			type: base.type,
			subtype,
			price: base.basePrice,
			stat,
			icons: base.iconPool.length,
			tags: join(base.tags),
		},
		definition: base,
	};
});

const affixEntries: CatalogEntry[] = itemAffixes.map((affix) => {
	const appliesTo = affix.appliesTo.map(applicabilityRuleSummary).join(" OR ");
	const applicabilityValues = unique(
		affix.appliesTo.flatMap((rule) => [
			...(rule.itemTypes ?? []),
			...(rule.weaponTypes ?? []),
			...(rule.damageTypes ?? []),
			...(rule.armourSlots ?? []),
			...(rule.armourCategories ?? []),
		]),
	);
	const damageTypes = unique(affix.appliesTo.flatMap((rule) => rule.damageTypes ?? []));
	return {
		id: affix.id,
		name: affix.name,
		images: [],
		searchText: makeSearchText(affix, [
			appliesTo,
			modifierSummary(affix.modifiers),
			riderSummary(affix.attackRiders),
		]),
		facets: {
			position: [affix.position],
			rarity: [affix.rarity],
			appliesTo: applicabilityValues,
			damageType: damageTypes,
			modifier: unique(affix.modifiers.map((modifier) => modifier.type)),
		},
		cells: {
			name: affix.name,
			id: affix.id,
			position: affix.position,
			rarity: affix.rarity,
			weight: affix.weight,
			appliesTo: appliesTo || "all",
			modifiers: modifierSummary(affix.modifiers) || "—",
			riders: riderSummary(affix.attackRiders) || "—",
			tags: join(affix.tags),
		},
		definition: affix,
	};
});

const itemEntries: CatalogEntry[] = items.map((item) => {
	const subtype =
		item.type === "weapon" ? item.weaponType : "category" in item ? item.category : item.slot;
	const stat =
		item.type === "weapon"
			? `${item.damage.dice} ${item.damage.type}`
			: "armourClass" in item
				? `AC ${item.armourClass}`
				: "—";
	const riders = item.type === "weapon" ? item.attackRiders : [];
	return {
		id: item.id,
		name: item.name,
		description: item.description,
		images: [item.icon],
		searchText: makeSearchText(item, [
			subtype,
			stat,
			modifierSummary(item.modifiers),
			riderSummary(riders),
		]),
		facets: {
			type: [item.type],
			subtype: [subtype],
			damageType: item.type === "weapon" ? [item.damage.type] : [],
			modifier: unique(item.modifiers.map((modifier) => modifier.type)),
		},
		cells: {
			name: item.name,
			id: item.id,
			type: item.type,
			subtype,
			price: item.price,
			stat,
			modifiers: modifierSummary(item.modifiers) || "—",
			riders: riderSummary(riders) || "—",
			tags: join(item.tags),
		},
		definition: item,
	};
});

const achievementEntries: CatalogEntry[] = achievements.map((achievement) => ({
	id: achievement.id,
	name: achievement.name,
	description: achievement.description,
	images: [achievement.icon],
	searchText: makeSearchText(achievement),
	facets: {},
	cells: {
		order: achievement.order,
		name: achievement.name,
		id: achievement.id,
		description: achievement.description,
	},
	definition: achievement,
}));

const columns = (...values: readonly (string | [string, string] | [string, string, boolean])[]) =>
	values.map((value): CatalogColumn => {
		if (typeof value === "string") {
			return { key: value, label: value.replace(/([A-Z])/g, " $1") };
		}
		return { key: value[0], label: value[1], numeric: value[2] };
	});

export const catalogs: readonly Catalog[] = [
	{
		key: "enemies",
		label: "Enemies",
		singular: "Enemy",
		entries: enemyEntries,
		hasImages: true,
		defaultSort: "name",
		columns: columns(
			"name",
			"id",
			"zone",
			"rank",
			["threat", "Threat", true],
			"battle",
			["ac", "AC", true],
			"hitDie",
			"attack",
			"tactic",
			"skills",
			"feats",
		),
		filters: makeFilters(enemyEntries, [
			{ key: "zone", label: "Zone" },
			{ key: "rank", label: "Rank" },
			{ key: "tactic", label: "Tactic" },
			{ key: "damageType", label: "Damage type" },
		]),
	},
	{
		key: "skills",
		label: "Skills",
		singular: "Skill",
		entries: skillEntries,
		hasImages: true,
		defaultSort: "name",
		columns: columns(
			"name",
			"id",
			"pool",
			"kind",
			"category",
			"rarity",
			"uses",
			"effects",
			"targets",
			"rollTypes",
			"rollModes",
			"durations",
			"damageTypes",
			"checks",
			"tags",
		),
		filters: makeFilters(skillEntries, [
			{ key: "pool", label: "Pool" },
			{ key: "kind", label: "Kind" },
			{ key: "category", label: "Category" },
			{ key: "rarity", label: "Rarity" },
			{ key: "effect", label: "Effect" },
			{ key: "damageType", label: "Damage type" },
			{ key: "target", label: "Target" },
			{ key: "rollType", label: "Roll type" },
			{ key: "rollMode", label: "Roll mode" },
			{ key: "durationUnit", label: "Duration unit" },
		]),
	},
	{
		key: "feats",
		label: "Feats",
		singular: "Feat",
		entries: featEntries,
		hasImages: true,
		defaultSort: "name",
		columns: columns("name", "id", "kind", "category", "modifiers", "riders", "tags"),
		filters: makeFilters(featEntries, [
			{ key: "kind", label: "Kind" },
			{ key: "category", label: "Category" },
			{ key: "modifier", label: "Modifier" },
			{ key: "timing", label: "Rider timing" },
		]),
	},
	{
		key: "classes",
		label: "Classes",
		singular: "Class",
		entries: classEntries,
		hasImages: true,
		defaultSort: "order",
		columns: columns(
			"order",
			"name",
			"id",
			"hitDie",
			"pools",
			"attributes",
			"proficiencies",
			"skills",
			"feats",
			"equipment",
		),
		filters: makeFilters(classEntries, [
			{ key: "pool", label: "Skill pool" },
			{ key: "tactic", label: "Tactic" },
			{ key: "armour", label: "Armour proficiency" },
			{ key: "weapon", label: "Weapon proficiency" },
		]),
	},
	{
		key: "item-bases",
		label: "Item Bases",
		singular: "Item Base",
		entries: itemBaseEntries,
		hasImages: true,
		defaultSort: "name",
		columns: columns(
			"name",
			"id",
			"type",
			"subtype",
			["price", "Price", true],
			"stat",
			["icons", "Icons", true],
			"tags",
		),
		filters: makeFilters(itemBaseEntries, [
			{ key: "type", label: "Type" },
			{ key: "subtype", label: "Subtype" },
			{ key: "damageType", label: "Damage type" },
		]),
	},
	{
		key: "affixes",
		label: "Affixes",
		singular: "Affix",
		entries: affixEntries,
		hasImages: false,
		defaultSort: "name",
		columns: columns(
			"name",
			"id",
			"position",
			"rarity",
			["weight", "Weight", true],
			"appliesTo",
			"modifiers",
			"riders",
			"tags",
		),
		filters: makeFilters(affixEntries, [
			{ key: "position", label: "Position" },
			{ key: "rarity", label: "Rarity" },
			{ key: "appliesTo", label: "Applies to" },
			{ key: "damageType", label: "Damage type rule" },
			{ key: "modifier", label: "Modifier" },
		]),
	},
	{
		key: "items",
		label: "Legendary Items",
		singular: "Legendary Item",
		entries: itemEntries,
		hasImages: true,
		defaultSort: "name",
		columns: columns(
			"name",
			"id",
			"type",
			"subtype",
			["price", "Price", true],
			"stat",
			"modifiers",
			"riders",
			"tags",
		),
		filters: makeFilters(itemEntries, [
			{ key: "type", label: "Type" },
			{ key: "subtype", label: "Subtype" },
			{ key: "damageType", label: "Damage type" },
			{ key: "modifier", label: "Modifier" },
		]),
	},
	{
		key: "achievements",
		label: "Achievements",
		singular: "Achievement",
		entries: achievementEntries,
		hasImages: true,
		defaultSort: "order",
		columns: columns(["order", "Order", true], "name", "id", "description"),
		filters: [],
	},
];

export const catalogByKey = Object.fromEntries(
	catalogs.map((catalog) => [catalog.key, catalog]),
) as Record<CategoryKey, Catalog>;

export function isCategoryKey(value: string | undefined): value is CategoryKey {
	return catalogs.some((catalog) => catalog.key === value);
}
