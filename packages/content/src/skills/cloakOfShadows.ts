import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cloak_of_shadows",
	name: "Cloak Of Shadows",
	description:
		"Shroud yourself in living shadow, obscuring your movements and helping you evade hostile effects.",
	icon: "skills/assassin/cloak_of_shadows.png",
	pool: "assassin",
	kind: "technique",
	category: "defensive",
	rarity: "epic",
	maxUses: 3,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "savingThrow",
			mode: "advantage",
			durationTurns: 4,
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			durationTurns: 4,
		},
	],
	tags: [],
});
