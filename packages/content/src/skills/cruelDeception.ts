import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cruel_deception",
	name: "Cruel Deception",
	description:
		"Manipulate your foe with deceptive tactics, charming them into possibly turning their attacks on themselves.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI1V0XtHIyPF14LC8N2?alt=media&token=725a9b62-6b5c-4e3f-aa3f-833d9e0c9b7d",
	pool: "rogue",
	category: "debuff",
	maxUses: 2,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "weakened",
					durationTurns: 4,
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
					durationTurns: 5,
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
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
