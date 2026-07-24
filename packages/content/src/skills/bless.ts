import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "bless",
	name: "Bless",
	description:
		"Invoke a sacred boon that grants the blessed effect, ensuring all saving throws succeed.",
	icon: "skills/common/bless.png",
	pool: "common",
	category: "buff",
	maxUses: 8,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "savingThrowBonus",
			value: 5,
			durationTurns: 8,
		},
	],
	tags: [],
});
