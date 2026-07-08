import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "fire_strike",
	name: "Fire Strike",
	description: "Infuse your attack with searing flames to scorch your target.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NKt0W8prsXi7-54nBVz?alt=media&token=20861d4d-7243-4d77-84b4-9d5a0a5f986a",
	pool: "barbarian",
	category: "attack",
	maxUses: 7,
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
							damageType: "fire",
							dice: "1d10+5",
						},
					],
				},
			],
		},
	],
	tags: [],
});
