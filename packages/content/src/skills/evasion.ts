import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "evasion",
	name: "Evasion",
	description:
		"Adopt an evasive stance that makes you exceptionally difficult to hit and sharpens your reflexes.",
	icon: "skills/thief/evasion.png",
	pool: "thief",
	kind: "technique",
	category: "defensive",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 10,
			duration: { unit: "turns", value: 3 },
		},
		{
			type: "modifyRoll",
			target: "self",
			roll: "savingThrow",
			attribute: "dexterity",
			mode: "automaticSuccess",
			duration: { unit: "turns", value: 3 },
		},
	],
	tags: [],
});
