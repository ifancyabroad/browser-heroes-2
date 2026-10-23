import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "expose_weakness",
	name: "Expose Weakness",
	description: "Increase all damage the enemy takes.",
	icon: "skills/assassin/expose_weakness.png",
	pool: "assassin",
	kind: "technique",
	category: "debuff",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "modifyDamageTaken",
			target: "enemy",
			operation: "multiply",
			value: 1.75,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
