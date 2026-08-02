import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "head_shot",
	name: "Head Shot",
	icon: "skills/common/head_shot.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
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
						},
					],
				},
			],
		},
	],
	tags: [],
});
