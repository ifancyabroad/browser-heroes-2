import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "heavy_strike",
	name: "Heavy Strike",
	description: "Deliver a powerful blow designed to deal significant damage to a single target.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhgpxFRvn_sOrij-K0F?alt=media&token=92063fcb-0f0c-4f6c-aec9-4c6d205bc431",
	pool: "warrior",
	category: "attack",
	maxUses: 4,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 1.5,
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
					multiplier: 1.88,
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
					multiplier: 2.25,
					attackRiders: [],
				},
			],
		},
	],
	tags: [],
});
