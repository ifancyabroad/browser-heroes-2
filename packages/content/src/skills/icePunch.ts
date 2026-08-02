import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "ice_punch",
	name: "Ice Punch",
	icon: "skills/common/ice_punch.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
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
							stat: "attackRollBonus",
							value: -2,
							durationTurns: 2,
						},
					],
				},
			],
		},
	],
	tags: [],
});
