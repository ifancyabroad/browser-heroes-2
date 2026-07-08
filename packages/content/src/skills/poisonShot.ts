import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_shot",
	name: "Poison Shot",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-puizRMUbmSpZfc8i?alt=media&token=7bde7857-e17e-42fa-95cc-18460ca736ef",
	pool: "common",
	category: "attack",
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
							damageType: "poison",
							dice: "1d6-1",
						},
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "poison",
							dice: "1d4",
							durationTurns: 3,
						},
					],
				},
			],
		},
	],
	tags: [],
});
