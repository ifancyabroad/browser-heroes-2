import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "divine_strength",
	name: "Divine Strength",
	description: "Infuse yourself with divine might, bolstering physical prowess.",
	icon: "skills/cleric/divine_strength.png",
	pool: "cleric",
	kind: "prayer",
	category: "buff",
	maxUses: 6,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			value: 4,
			durationTurns: 8,
		},
	],
	tags: [],
});
