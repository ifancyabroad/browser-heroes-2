import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "expose_weakness",
	name: "Expose Weakness",
	description:
		"Study the enemy's defenses and expose a weakness, causing them to suffer greater damage for the rest of the battle.",
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
