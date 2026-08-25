import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cleave",
	name: "Cleave",
	description: "A powerful weapon swing that deals additional slashing damage.",
	icon: "skills/barbarian/cleave.png",
	pool: "barbarian",
	kind: "weaponAttack",
	category: "damage",
	rarity: "common",
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
							damageClass: "physical",
							dice: "1d8",
						},
					],
				},
			],
		},
	],
	tags: [],
});
