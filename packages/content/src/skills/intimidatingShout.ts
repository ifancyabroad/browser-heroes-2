import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "intimidating_shout",
	name: "Intimidating Shout",
	description: "Release a fearsome bellow that can leave the enemy attacking at a disadvantage.",
	icon: "skills/barbarian/intimidating_shout.png",
	pool: "barbarian",
	kind: "technique",
	category: "debuff",
	maxUses: 3,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			durationTurns: 3,
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
	],
	tags: [],
});
