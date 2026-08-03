import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "drain_energy",
	name: "Drain Energy",
	description:
		"Steal the enemy's vigour to fortify yourself while weakening the force of their attacks and magic.",
	icon: "skills/occultist/drain_energy.png",
	pool: "occultist",
	kind: "spell",
	category: "debuff",
	maxUses: 3,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "maxHpBonus",
			value: 20,
			durationTurns: 5,
		},
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.5,
			durationTurns: 5,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
