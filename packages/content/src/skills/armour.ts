import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "armour",
	name: "Armour",
	description: "Conjure a thin layer of physical protection.",
	icon: "skills/mage/armour.png",
	pool: "mage",
	kind: "spell",
	category: "defensive",
	maxUses: 8,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 6,
			durationTurns: 10,
		},
	],
	tags: [],
});
