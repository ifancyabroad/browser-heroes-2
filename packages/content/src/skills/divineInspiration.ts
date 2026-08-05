import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "divine_inspiration",
	name: "Divine Inspiration",
	description:
		"Receive enduring divine inspiration that fortifies body and spirit against adversity.",
	icon: "skills/cleric/divine_inspiration.png",
	pool: "cleric",
	kind: "prayer",
	category: "buff",
	rarity: "epic",
	maxUses: 4,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "savingThrowBonus",
			value: 4,
			duration: { unit: "turns", value: 8 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "maxHpBonus",
			value: 20,
			duration: { unit: "turns", value: 8 },
		},
	],
	tags: [],
});
