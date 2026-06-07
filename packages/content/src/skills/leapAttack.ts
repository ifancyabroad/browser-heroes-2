import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "leap_attack",
	name: "Leap Attack",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC3_Ea2wZ_5cHuPGwB5?alt=media&token=94f7574d-1aa9-468b-8dc3-700988e623bf",
	pool: "common",
	category: "attack",
	usage: {
		target: "enemy",
		requiresAttackRoll: true,
		maxUses: 4,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1.75,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 2.19,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 2.63,
				},
			],
		},
	],
	tags: [],
});
