import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "armour_break",
	name: "Armour Break",
	description: "A powerful blow that weakens an enemy's defenses.",
	icon: "skills/warrior/armour_break.png",
	pool: "warrior",
	kind: "weaponAttack",
	category: "debuff",
	maxUses: 5,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [
				{
					timing: "onHit",
					save: {
						attribute: "strength",
						onSuccess: "noEffect",
						dc: { attribute: "strength" },
					},
					effects: [
						{
							type: "modifyStat",
							target: "enemy",
							stat: "armourClass",
							value: -4,
							durationTurns: 3,
						},
					],
				},
			],
		},
	],
	tags: [],
});
