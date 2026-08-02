import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "intimidating_shout",
	name: "Intimidating Shout",
	description:
		"Release a fearsome bellow that may sap the enemy's resolve and halve their damage.",
	icon: "skills/barbarian/intimidating_shout.png",
	pool: "barbarian",
	kind: "technique",
	category: "debuff",
	maxUses: 3,
	effects: [
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.5,
			durationTurns: 5,
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
	],
	tags: [],
});
