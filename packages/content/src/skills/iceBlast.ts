import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "ice_blast",
	name: "Ice Blast",
	description:
		"Deal cold damage to the enemy, halved on a successful Constitution saving throw. A separate failed Constitution saving throw gives them disadvantage on attack rolls for 1 turn.",
	icon: "skills/common/ice_blast.png",
	pool: "common",
	kind: "spell",
	category: "damage",
	rarity: "uncommon",
	maxUses: 6,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "cold",
			damageClass: "magical",
			dice: "4d6",
			attribute: "intelligence",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			duration: { unit: "turns", value: 1 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
