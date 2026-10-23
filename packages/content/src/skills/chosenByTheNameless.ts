import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "chosen_by_the_nameless",
	name: "Chosen by the Nameless",
	description:
		"Gain advantage on attack rolls and saving throws, and increase your damage dealt and maximum HP for the current battle.",
	icon: "skills/unique/chosen_by_the_nameless.png",
	pool: "unique",
	kind: "spell",
	category: "buff",
	rarity: "legendary",
	maxUses: 1,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "savingThrow",
			mode: "advantage",
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyDamage",
			target: "self",
			operation: "multiply",
			value: 3,
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "maxHpBonus",
			value: 100,
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
