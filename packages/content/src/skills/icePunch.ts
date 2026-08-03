import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "ice_punch",
	name: "Ice Punch",
	description: "Drive an ice-laden fist into the enemy, numbing their counterattacks.",
	icon: "skills/common/ice_punch.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "epic",
	maxUses: 4,
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
							dice: "1d8",
						},
						{
							type: "modifyRoll",
							target: "enemy",
							roll: "attack",
							mode: "disadvantage",
							durationTurns: 2,
							save: {
								attribute: "constitution",
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
