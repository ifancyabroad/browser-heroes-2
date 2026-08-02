import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "divine_inspiration",
	name: "Divine Inspiration",
	description:
		"Receive a surge of divine power, greatly enhancing strength, dexterity, and constitution to improve your combat abilities.",
	icon: "skills/cleric/divine_inspiration.png",
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
		{
			type: "modifyStat",
			target: "self",
			stat: "savingThrowBonus",
			value: 4,
			durationTurns: 8,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "maxHpBonus",
			value: 8,
			durationTurns: 8,
		},
	],
	tags: [],
});
