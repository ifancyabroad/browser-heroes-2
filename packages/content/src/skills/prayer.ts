import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "prayer",
	name: "Prayer",
	description: "Increase your radiant damage dealt and healing for the current battle.",
	icon: "skills/cleric/prayer.png",
	pool: "cleric",
	kind: "prayer",
	category: "buff",
	rarity: "uncommon",
	maxUses: 6,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "radiant",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyHealing",
			target: "self",
			multiplier: 1.5,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
