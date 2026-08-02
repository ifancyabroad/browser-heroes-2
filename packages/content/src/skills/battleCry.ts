import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "battle_cry",
	name: "Battle Cry",
	description: "Amplify your strength with a resounding Battle Cry.",
	icon: "skills/barbarian/battle_cry.png",
	pool: "barbarian",
	kind: "technique",
	category: "buff",
	maxUses: 5,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			durationTurns: 5,
		},
		{
			type: "modifyDamage",
			target: "self",
			operation: "multiply",
			value: 1.25,
			durationTurns: 5,
		},
	],
	tags: [],
});
