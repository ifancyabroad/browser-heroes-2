import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cleave",
	name: "Cleave",
	description: "A powerful weapon swing that deals additional slashing damage.",
	icon: "skills/barbarian/cleave.png",
	pool: "barbarian",
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
							damageType: "slashing",
							dice: "2d8",
						},
					],
				},
			],
		},
	],
	tags: [],
});
