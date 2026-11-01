import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "draining_kiss",
	name: "Draining Kiss",
	description:
		"Deal necrotic damage to the enemy. A separate failed Constitution saving throw also reduces their maximum HP by 50 until the battle ends.",
	icon: "skills/unique/draining_kiss.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			damageClass: "magical",
			attackRange: "melee",
			dice: "5d10",
			attribute: "charisma",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "charisma" },
			},
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "maxHpBonus",
			value: -50,
			duration: { unit: "battles", value: 1 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "charisma" },
			},
		},
	],
	tags: [],
});
