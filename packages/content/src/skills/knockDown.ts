import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "knock_down",
	name: "Knock Down",
	description: "Deliver a forceful blow that may topple the enemy and deny their response.",
	icon: "skills/common/knock_down.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	maxUses: 1,
	effects: [
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
							durationTurns: 2,
							save: {
								attribute: "strength",
								onSuccess: "noEffect",
								dc: { attribute: "strength" },
							},
						},
					],
				},
			],
		},
	],
	tags: [],
});
