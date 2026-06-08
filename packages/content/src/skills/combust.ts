import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "combust",
	name: "Combust",
	description: "Overheat and erupt into flames burning all those around you.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O4VXesSYLdWh1Qf_7Io?alt=media&token=ec76c559-adce-4e10-8940-360fb1a03497",
	pool: "unique",
	category: "spell",
	maxUses: 1,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "self",
					damageType: "fire",
					dice: "25d6+13",
					requiresAttackRoll: false,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "4d12+19",
					requiresAttackRoll: false,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "self",
					damageType: "fire",
					dice: "38d6+12",
					requiresAttackRoll: false,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "6d12+26",
					requiresAttackRoll: false,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "self",
					damageType: "fire",
					dice: "50d6+15",
					requiresAttackRoll: false,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "8d12+34",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
