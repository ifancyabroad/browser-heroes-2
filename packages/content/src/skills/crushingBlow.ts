import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "crushing_blow",
	name: "Crushing Blow",
	description: "Land a concussive strike that can leave the enemy's attacks unsteady.",
	icon: "skills/barbarian/crushing_blow.png",
	pool: "barbarian",
	kind: "weaponAttack",
	category: "damage",
	rarity: "uncommon",
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
							damageType: "crushing",
							dice: "1d6",
						},
					],
				},
				{
					timing: "onHit",
					save: {
						attribute: "constitution",
						onSuccess: "noEffect",
						dc: { attribute: "strength" },
					},
					effects: [
						{
							type: "modifyStat",
							target: "enemy",
							stat: "attackRollBonus",
							value: -3,
							durationTurns: 2,
						},
					],
				},
			],
		},
	],
	tags: [],
});
