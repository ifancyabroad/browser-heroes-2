import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_fortitude",
	name: "Power Word: Fortitude",
	description: "Increase your maximum HP across multiple battles.",
	icon: "skills/common/power_word_fortitude.png",
	pool: "common",
	kind: "spell",
	category: "buff",
	rarity: "rare",
	maxUses: 4,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "maxHpBonus",
			value: 30,
			duration: { unit: "battles", value: 5 },
		},
	],
	tags: [],
});
