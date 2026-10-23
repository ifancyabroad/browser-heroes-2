import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "summon_storm",
	name: "Summon Storm",
	description:
		"Deal lightning damage to the enemy. A failed Dexterity saving throw also causes lightning damage over time.",
	icon: "skills/unique/summon_storm.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	rarity: "legendary",
	maxUses: 1,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			damageClass: "magical",
			dice: "6d10",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "charisma" },
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "lightning",
			damageClass: "magical",
			dice: "2d10",
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: { attribute: "charisma" },
			},
		},
	],
	tags: [],
});
