import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reposition",
	name: "Reposition",
	description: "Increase your Armour Class and attack roll bonus.",
	icon: "skills/common/reposition.png",
	pool: "common",
	kind: "technique",
	category: "buff",
	rarity: "uncommon",
	maxUses: 4,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 4,
			duration: { unit: "turns", value: 4 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			value: 4,
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
