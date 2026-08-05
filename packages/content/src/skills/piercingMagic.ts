import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "piercing_magic",
	name: "Piercing Magic",
	description: "Focus your arcane power, making your spells and effects harder to resist.",
	icon: "skills/wizard/piercing_magic.png",
	pool: "wizard",
	kind: "spell",
	category: "buff",
	rarity: "rare",
	maxUses: 2,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "saveDcBonus",
			value: 4,
			duration: { unit: "battles", value: 5 },
		},
	],
	tags: [],
});
