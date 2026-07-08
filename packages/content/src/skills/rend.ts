import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "rend",
	name: "Rend",
	description: "Strike the enemy to pierce the skin and cause them to bleed.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NJQ2hml_9m6iHzAfES5?alt=media&token=5e94443d-b8ce-4bb2-9f9f-4eb6c8197469",
	pool: "warrior",
	category: "attack",
	maxUses: 4,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "slashing",
							dice: "1d4",
							durationTurns: 3,
						},
					],
				},
			],
		},
	],
	tags: [],
});
