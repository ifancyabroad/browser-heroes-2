import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "tail_swipe",
	name: "Tail Swipe",
	description: "Sweep the enemy aside with a heavy tail strike that may knock them senseless.",
	icon: "skills/common/tail_swipe.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	maxUses: 7,
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
								attribute: "dexterity",
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
