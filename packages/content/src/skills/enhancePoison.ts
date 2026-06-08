import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "enhance_poison",
	name: "Enhance Poison",
	description:
		"Amplify the potency of your poison, causing it to inflict greater, lingering damage.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh16M9sVTTOKw5g6rO?alt=media&token=c934a0ad-5942-45c9-ada7-02516b04aa9b",
	pool: "assassin",
	category: "buff",
	maxUses: 6,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "poison",
					operation: "add",
					value: 50,
					durationTurns: 8,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "poison",
					operation: "add",
					value: 75,
					durationTurns: 9,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "poison",
					operation: "add",
					value: 100,
					durationTurns: 10,
				},
			],
		},
	],
	tags: [],
});
