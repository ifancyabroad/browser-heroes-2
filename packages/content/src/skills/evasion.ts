import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "evasion",
	name: "Evasion",
	description:
		"Adopt an evasive stance that makes you exceptionally difficult to hit and sharpens your reflexes.",
	icon: "skills/rogue/evasion.png",
	pool: "rogue",
	kind: "technique",
	category: "defensive",
	maxUses: 3,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 10,
			durationTurns: 3,
		},
		{
			type: "modifyRoll",
			target: "self",
			roll: "savingThrow",
			attribute: "dexterity",
			mode: "advantage",
			durationTurns: 3,
		},
	],
	tags: [],
});
