import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "drop_from_above",
	name: "Drop from Above",
	description: "Plunge onto the enemy with crushing force and potentially leave them stunned.",
	icon: "skills/common/drop_from_above.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	maxUses: 1,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 2,
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
