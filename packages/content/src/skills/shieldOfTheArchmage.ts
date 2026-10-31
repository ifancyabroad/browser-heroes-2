import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shield_of_the_archmage",
	name: "Shield of the Archmage",
	description:
		"Gain a shield that absorbs incoming damage for the current battle and reduce all damage you take.",
	icon: "skills/unique/shield_of_the_archmage.png",
	pool: "unique",
	kind: "spell",
	category: "defensive",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "shield",
			target: "self",
			amount: 80,
			duration: { unit: "turns", value: 5 },
		},
		{
			type: "modifyDamageTaken",
			target: "self",
			operation: "multiply",
			value: 0.5,
			duration: { unit: "turns", value: 5 },
		},
	],
	tags: [],
});
