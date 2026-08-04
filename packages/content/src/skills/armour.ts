import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "armour",
	name: "Armour",
	description: "Conjure a durable arcane shell that greatly reinforces your armour.",
	icon: "skills/wizard/armour.png",
	pool: "wizard",
	kind: "spell",
	category: "defensive",
	rarity: "uncommon",
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
