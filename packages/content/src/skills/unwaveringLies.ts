import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "unwavering_lies",
	name: "Unwavering Lies",
	description:
		"Reduce the enemy's damage dealt and healing, each requiring a separate failed Wisdom saving throw.",
	icon: "skills/unique/unwavering_lies.png",
	pool: "unique",
	kind: "spell",
	category: "debuff",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.5,
			duration: { unit: "turns", value: 10 },
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "charisma" },
			},
		},
		{
			type: "modifyHealing",
			target: "enemy",
			multiplier: 0.5,
			duration: { unit: "turns", value: 10 },
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "charisma" },
			},
		},
	],
	tags: [],
});
