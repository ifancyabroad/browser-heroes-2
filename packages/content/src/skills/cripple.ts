import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cripple",
	name: "Cripple",
	description:
		"Inflict debilitating injury with Cripple, weakening enemies and hindering their movements in the throes of battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhgzTUnXwX4Iw8JGJev?alt=media&token=0e42a7f5-dee5-4f7a-8366-3563b162943f",
	pool: "common",
	category: "debuff",
	maxUses: 6,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "weakened",
					durationTurns: 6,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "weakened",
					durationTurns: 7,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "weakened",
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
