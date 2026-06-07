import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "binkus_deathray",
	name: "Binkus' Deathray",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCIAJrIHwRDdKdzqtlj?alt=media&token=36a41337-d39d-4b6e-8b0f-c67a945b2cf9",
	pool: "unique",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 1,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "3d12+16",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "3d12+16",
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "5d12+18",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "5d12+18",
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "6d12+28",
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "6d12+28",
				},
			],
		},
	],
	tags: [],
});
