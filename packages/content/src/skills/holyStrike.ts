import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "holy_strike",
	name: "Holy Strike",
	description: "Unleash divine retribution, smiting foes with holy power.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkP4BW6tSXQG6EoCJq?alt=media&token=1cc90227-b3e3-4e44-bd0c-c35455a2cc97",
	pool: "cleric",
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
							damageType: "radiant",
							dice: "1d8",
						},
					],
				},
			],
		},
	],
	tags: [],
});
