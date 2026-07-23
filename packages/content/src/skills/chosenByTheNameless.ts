import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "chosen_by_the_nameless",
	name: "Chosen by the Nameless",
	icon: "skills/unique/chosen_by_the_nameless.png",
	pool: "unique",
	category: "buff",
	maxUses: 1,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "savingThrowBonus",
			operation: "add",
			value: 4,
			durationTurns: 6,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "maxHpBonus",
			operation: "add",
			value: 8,
			durationTurns: 6,
		},
	],
	tags: [],
});
