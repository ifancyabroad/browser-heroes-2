import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "ice_punch",
	name: "Ice Punch",
	icon: "skills/common/ice_punch.png",
	pool: "common",
	category: "attack",
	maxUses: 6,
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
							type: "damage",
							target: "enemy",
							damageType: "cold",
							dice: "1d12+8",
						},
						{
							type: "modifyStat",
							target: "enemy",
							stat: "dexterity",
							operation: "add",
							value: -4,
							durationTurns: 2,
						},
					],
				},
			],
		},
	],
	tags: [],
});
