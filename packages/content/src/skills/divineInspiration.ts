import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "divine_inspiration",
	name: "Divine Inspiration",
	description: "Increase your saving throw bonus and maximum HP.",
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
