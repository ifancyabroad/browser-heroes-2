import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flamestrike",
	name: "Flamestrike",
	description:
		"Call down a powerful strike of both fire and radiant energy, burning and searing enemies in its path.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTX-eKaRJ03i_t4QJ7?alt=media&token=59d4c54f-9da1-4e86-b698-c08912e3582b",
	pool: "cleric",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 3,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "1d8+3",
					attribute: "wisdom",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "1d8+3",
					attribute: "wisdom",
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "2d8+1",
					attribute: "wisdom",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "2d8+1",
					attribute: "wisdom",
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "2d8+4",
					attribute: "wisdom",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "2d8+4",
					attribute: "wisdom",
				},
			],
		},
	],
	tags: [],
});
