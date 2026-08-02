import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "evasion",
	name: "Evasion",
	description: "Adopt an evasive stance that confounds attacks and sharpens your reflexes.",
	icon: "skills/rogue/evasion.png",
	pool: "rogue",
	kind: "technique",
	category: "defensive",
	maxUses: 4,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			durationTurns: 4,
		},
		{
			type: "modifyRoll",
			target: "self",
			roll: "savingThrow",
			attribute: "dexterity",
			mode: "advantage",
			durationTurns: 5,
		},
	],
	tags: [],
});
