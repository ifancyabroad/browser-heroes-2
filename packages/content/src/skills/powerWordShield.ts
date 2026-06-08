import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_shield",
	name: "Power Word: Shield",
	description:
		"Enchant yourself with a powerful shield, significantly increasing your armor class.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTRA6CoAdH4tX5ht_3?alt=media&token=47263956-7149-46fd-9133-8a7827a6b68c",
	pool: "occultist",
	category: "buff",
	maxUses: 8,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: 4,
					durationTurns: 8,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: 6,
					durationTurns: 9,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "armourClass",
					operation: "add",
					value: 8,
					durationTurns: 10,
				},
			],
		},
	],
	tags: [],
});
