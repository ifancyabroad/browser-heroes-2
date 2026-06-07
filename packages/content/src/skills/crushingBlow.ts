import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "crushing_blow",
	name: "Crushing Blow",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-ODAw3gDINrvjsnEE52L?alt=media&token=583e5483-a891-4f18-a897-0bc2f4781577",
	pool: "barbarian",
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
					damageType: "crushing",
					dice: "1d8+3",
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
					damageType: "crushing",
					dice: "2d8+1",
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
					damageType: "crushing",
					dice: "2d8+4",
				},
			],
		},
	],
	tags: [],
});
