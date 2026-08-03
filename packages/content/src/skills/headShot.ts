import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "head_shot",
	name: "Head Shot",
	description: "Aim a devastating shot at the enemy's head with a chance to leave them stunned.",
	icon: "skills/common/head_shot.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1.5,
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "applyStatus",
							target: "enemy",
							statusId: "stunned",
							durationTurns: 1,
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
