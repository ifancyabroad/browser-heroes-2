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
	maxUses: 2,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "savingThrowBonus",
			value: 5,
			duration: { unit: "battles", value: 5 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "maxHpBonus",
			value: 40,
			duration: { unit: "battles", value: 5 },
		},
	],
	tags: [],
});
