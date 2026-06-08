import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "summon_storm",
	name: "Summon Storm",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC4v4pMGZ1Llq1EBU66?alt=media&token=f7c02506-ce17-4908-8ef2-6f850ff7c328",
	pool: "unique",
	category: "spell",
	maxUses: 1,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "lightning",
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
					target: "enemy",
					damageType: "lightning",
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
					target: "enemy",
					damageType: "lightning",
					dice: "8d12+34",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
