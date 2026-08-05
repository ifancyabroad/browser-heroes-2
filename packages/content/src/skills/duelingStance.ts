import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dueling_stance",
	name: "Dueling Stance",
	description: "Adopt a defensive posture that improves armour at the cost of damage dealt.",
	icon: "skills/fighter/dueling_stance.png",
	pool: "fighter",
	kind: "technique",
	category: "defensive",
	rarity: "rare",
	maxUses: 6,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 8,
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyDamage",
			target: "self",
			operation: "multiply",
			value: 0.75,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
