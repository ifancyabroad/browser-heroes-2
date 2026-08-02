import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "corruption",
	name: "Corruption",
	description:
		"Unleash a vile energy that has a chance to cripple the enemy and lower their resistance to necrotic damage.",
	icon: "skills/warlock/corruption.png",
	pool: "warlock",
	category: "debuff",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "necrotic",
			durationTurns: 5,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "attackRollBonus",
			value: -2,
			durationTurns: 5,
		},
	],
	tags: [],
});
