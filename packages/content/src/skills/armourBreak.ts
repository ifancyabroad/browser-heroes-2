import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "armour_break",
	name: "Armour Break",
	description: "A powerful blow that weakens an enemy's defenses.",
	icon: "skills/fighter/armour_break.png",
	pool: "fighter",
	kind: "weaponAttack",
	category: "debuff",
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
							type: "modifyStat",
							target: "enemy",
							stat: "armourClass",
							value: -4,
							duration: { unit: "turns", value: 3 },
						},
					],
				},
			],
		},
	],
	tags: [],
});
