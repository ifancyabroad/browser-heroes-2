const labels: Record<string, string> = {
	order: "Display order",
	encounterWeight: "Encounter weight",
	id: "ID",
	classId: "Class ID",
	baseId: "Base ID",
	skillIds: "Skills",
	additionalSkillIds: "Additional skills",
	featIds: "Feats",
	hitDie: "Hit die",
	attackDamage: "Weapon damage",
	attackRiders: "Attack riders",
	damageOverTime: "Damage over time",
	healOverTime: "Healing over time",
	modifyDamageAffinity: "Modify damage affinity",
	modifyDamageTaken: "Modify damage taken",
	modifyHealing: "Modify healing",
	modifyRoll: "Modify roll",
	modifyStat: "Modify stat",
	applyStatus: "Apply status",
	removeStatus: "Remove status",
	save: "Saving throw",
	dc: "Difficulty class",
	maxHp: "Maximum HP",
	maxUses: "Maximum uses",
	armourClass: "Armour class",
	onHit: "On hit",
	onCrit: "On critical hit",
	onSuccess: "On successful save",
	noEffect: "No effect",
};

export function formatLabel(value: string) {
	return (
		labels[value] ??
		value.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/^./, (letter) => letter.toUpperCase())
	);
}

export function formatDuration(duration: { value: number; unit: string }) {
	return `${duration.value} ${duration.value === 1 ? duration.unit.replace(/s$/, "") : duration.unit}`;
}

const enumFields = new Set([
	"pool",
	"kind",
	"category",
	"rarity",
	"type",
	"subtype",
	"zone",
	"rank",
	"tactic",
	"position",
	"target",
	"timing",
	"attribute",
	"damageType",
	"damageTypeOverride",
	"damageClass",
	"attackRange",
	"affinity",
	"operation",
	"onSuccess",
	"mode",
	"roll",
	"stat",
	"rollMode",
	"weaponType",
	"slot",
]);
const enumLists = new Set(["effects", "targets", "damageTypes", "rollTypes", "rollModes"]);

export function formatValue(field: string, value: string | number): string {
	if (typeof value === "number") {
		return String(value);
	}
	if (enumLists.has(field)) {
		return value.split(", ").map(formatLabel).join(" · ");
	}
	return enumFields.has(field) ? formatLabel(value) : value;
}
