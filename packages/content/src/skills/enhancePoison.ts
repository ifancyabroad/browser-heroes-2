import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "enhance_poison",
	name: "Enhance Poison",
	description: "Increase your poison damage dealt.",
	icon: "skills/assassin/enhance_poison.png",
	pool: "assassin",
	kind: "technique",
	category: "buff",
	rarity: "uncommon",
	maxUses: 6,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "poison",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
