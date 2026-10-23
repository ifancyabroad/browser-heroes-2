import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cloak_of_shadows",
	name: "Cloak Of Shadows",
	description: "Reduce magical damage you take.",
	icon: "skills/assassin/cloak_of_shadows.png",
	pool: "assassin",
	kind: "technique",
	category: "defensive",
	rarity: "uncommon",
	maxUses: 2,
	effects: [
		{
			type: "modifyDamageTaken",
			target: "self",
			damageClass: "magical",
			operation: "multiply",
			value: 0.25,
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
