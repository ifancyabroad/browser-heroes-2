import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "multi_shot",
	name: "Multi Shot",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC-KtM9y-zKPmVbOwsO?alt=media&token=fad213f7-bc3e-4374-8ab1-d50259c9899b",
	pool: "common",
	category: "attack",
	usage: {
		target: "enemy",
		requiresAttackRoll: true,
		maxUses: 2,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 0.5,
				},
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 0.5,
				},
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 0.5,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 0.63,
				},
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 0.63,
				},
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 0.63,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 0.75,
				},
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 0.75,
				},
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 0.75,
				},
			],
		},
	],
	tags: [],
});
