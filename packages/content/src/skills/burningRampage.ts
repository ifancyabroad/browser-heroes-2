import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "burning_rampage",
	name: "Burning Rampage",
	description:
		"Unleash the flames within and ignite your enemies with this powerful fire attack.",
	icon: "skills/barbarian/burning_rampage.png",
	pool: "barbarian",
	kind: "weaponAttack",
	category: "damage",
	maxUses: 3,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1.25,
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "fire",
							dice: "2d6",
							durationTurns: 3,
						},
					],
				},
			],
		},
	],
	tags: [],
});
