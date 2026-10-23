import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "piercing_magic",
	name: "Piercing Magic",
	description: "Increase your saving throw DCs across multiple battles.",
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
			value: 5,
			duration: { unit: "battles", value: 5 },
		},
	],
	tags: [],
});
