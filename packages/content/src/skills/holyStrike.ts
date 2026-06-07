import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "holy_strike",
	name: "Holy Strike",
	description: "Unleash divine retribution, smiting foes with holy power.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkP4BW6tSXQG6EoCJq?alt=media&token=1cc90227-b3e3-4e44-bd0c-c35455a2cc97",
	pool: "cleric",
	category: "attack",
	usage: {
		target: "enemy",
		requiresAttackRoll: true,
		maxUses: 7,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "1d8",
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1.25,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "2d8-2",
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1.5,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "2d8",
				},
			],
		},
	],
	tags: [],
});
