import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dragon_focus",
	name: "Dragon Focus",
	description:
		"Gather draconic power, sharpening attacks and making supernatural abilities harder to resist.",
	icon: "skills/common/dragon_focus.png",
	pool: "common",
	kind: "technique",
	category: "buff",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "saveDcBonus",
			value: 5,
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
