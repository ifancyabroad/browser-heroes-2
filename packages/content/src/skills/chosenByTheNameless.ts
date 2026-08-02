import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "chosen_by_the_nameless",
	name: "Chosen by the Nameless",
	description:
		"Receive the Nameless One's favour, transforming frail flesh into a vessel of terrible power.",
	icon: "skills/unique/chosen_by_the_nameless.png",
	pool: "unique",
	kind: "spell",
	category: "buff",
	maxUses: 1,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "savingThrow",
			mode: "advantage",
			durationTurns: 6,
		},
		{
			type: "modifyDamage",
			target: "self",
			operation: "multiply",
			value: 2,
			durationTurns: 6,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "maxHpBonus",
			value: 30,
			durationTurns: 6,
		},
	],
	tags: [],
});
