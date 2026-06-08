import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "petrifying_gaze",
	name: "Petrifying Gaze",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTPv9FLqVI9cJXml2R?alt=media&token=2ef42b93-02e9-40dd-b953-a8ff22d8dacf",
	pool: "common",
	category: "debuff",
	maxUses: 1,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stunned",
					durationTurns: 2,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stunned",
					durationTurns: 3,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stunned",
					durationTurns: 4,
				},
			],
		},
	],
	tags: [],
});
