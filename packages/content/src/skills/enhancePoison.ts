import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "enhance_poison",
	name: "Enhance Poison",
	description:
		"Concentrate your toxins, greatly increasing poison damage for the encounter ahead.",
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
			duration: { unit: "turns", value: 8 },
		},
	],
	tags: [],
});
