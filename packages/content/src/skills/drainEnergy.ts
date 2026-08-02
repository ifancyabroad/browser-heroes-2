import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "drain_energy",
	name: "Drain Energy",
	description:
		"Sap the enemy's vigour, drastically weakening the force of their attacks and magic.",
	icon: "skills/occultist/drain_energy.png",
	pool: "occultist",
	kind: "spell",
	category: "debuff",
	maxUses: 4,
	effects: [
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
