import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "attack",
	name: "Attack",
	description: "A basic weapon attack.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NfROP8bobODCeEQFrpd?alt=media&token=5f56ac9a-64e5-422e-89a4-a09a4c7baddb",
	pool: "common",
	category: "attack",
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 1,
					attackRiders: [],
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 1.25,
					attackRiders: [],
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 1.5,
					attackRiders: [],
				},
			],
		},
	],
	tags: [],
});
