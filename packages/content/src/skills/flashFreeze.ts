import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flash_freeze",
	name: "Flash Freeze",
	description:
		"Deal cold damage to the enemy, halved on a successful Constitution saving throw. A separate failed Constitution saving throw stuns them.",
	icon: "skills/unique/flash_freeze.png",
	pool: "unique",
	kind: "technique",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "cold",
			damageClass: "other",
			dice: "6d8",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "constitution" },
			},
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			duration: { unit: "turns", value: 1 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
