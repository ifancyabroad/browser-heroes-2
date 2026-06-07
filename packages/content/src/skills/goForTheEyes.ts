import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "go_for_the_eyes",
	name: "Go For The Eyes",
	description: "Aim for the opponents eyes with a chance to temporarily blind them.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqb8JkDlplkchg0htc?alt=media&token=d137cfde-7d00-42aa-b967-c97844037121",
	pool: "rogue",
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
					multiplier: 1,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "blind",
					durationTurns: 1,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1.25,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "blind",
					durationTurns: 2,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1.5,
				},
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "blind",
					durationTurns: 3,
				},
			],
		},
	],
	tags: [],
});
