import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "head_shot",
	name: "Head Shot",
	description:
		"Guarantee a critical shot to the enemy's head with a chance to leave them stunned.",
	icon: "skills/common/head_shot.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "automaticCritical",
			charges: 1,
			duration: { unit: "turns", value: 1 },
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "applyStatus",
							target: "enemy",
							statusId: "stunned",
							duration: { unit: "turns", value: 1 },
							save: {
								attribute: "constitution",
								onSuccess: "noEffect",
								dc: { attribute: "dexterity" },
							},
						},
					],
				},
			],
		},
	],
	tags: [],
});
