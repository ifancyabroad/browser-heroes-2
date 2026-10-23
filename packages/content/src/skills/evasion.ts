import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "evasion",
	name: "Evasion",
	description:
		"Increase your Armour Class and automatically succeed on Dexterity saving throws while the effect lasts.",
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
