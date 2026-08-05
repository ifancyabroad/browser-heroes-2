import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "creeping_darkness",
	name: "Creeping Darkness",
	description:
		"Surround the enemy with encroaching darkness that may leave their attacks uncertain.",
	icon: "skills/common/creeping_darkness.png",
	pool: "common",
	kind: "technique",
	category: "debuff",
	rarity: "uncommon",
	maxUses: 3,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			duration: { unit: "turns", value: 5 },
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
