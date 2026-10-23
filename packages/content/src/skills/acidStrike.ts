import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_strike",
	name: "Acid Strike",
	description: "Make a weapon attack that deals additional acid damage on hit.",
	icon: "skills/thief/acid_strike.png",
	pool: "thief",
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
							damageType: "acid",
							damageClass: "other",
							dice: "2d4",
						},
					],
				},
			],
		},
	],
	tags: [],
});
