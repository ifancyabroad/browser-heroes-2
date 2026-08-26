import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "creeping_darkness",
	name: "Creeping Darkness",
	description:
		"Surround the enemy with encroaching darkness that may cloud the accuracy of their attacks.",
	icon: "skills/common/creeping_darkness.png",
	pool: "common",
	kind: "technique",
	category: "debuff",
	rarity: "uncommon",
	maxUses: 3,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "attackRollBonus",
			value: -3,
			duration: { unit: "battles", value: 1 },
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
