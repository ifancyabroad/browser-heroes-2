import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "rend",
	name: "Rend",
	description: "Strike the enemy to pierce the skin and cause them to bleed.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NJQ2hml_9m6iHzAfES5?alt=media&token=5e94443d-b8ce-4bb2-9f9f-4eb6c8197469",
	pool: "warrior",
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
					type: "applyStatus",
					target: "enemy",
					statusId: "bleed",
					durationTurns: 3,
				},
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "bleed",
					durationTurns: 4,
				},
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1.25,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "bleed",
					durationTurns: 5,
				},
				{
					type: "weaponDamage",
					target: "enemy",
					multiplier: 1.5,
				},
			],
		},
	],
	tags: [],
});
