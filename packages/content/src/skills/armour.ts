import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "armour",
	name: "Armour",
	description: "Increase your Armour Class across multiple battles.",
	icon: "skills/wizard/armour.png",
	pool: "wizard",
	kind: "spell",
	category: "defensive",
	rarity: "uncommon",
	maxUses: 2,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 4,
			duration: { unit: "battles", value: 5 },
		},
	],
	tags: [],
});
