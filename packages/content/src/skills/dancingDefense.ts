import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dancing_defense",
	name: "Dancing Defense",
	description: "Flow between attack and defense with rhythmic, evasive movement.",
	icon: "skills/fighter/dancing_defense.png",
	pool: "fighter",
	kind: "technique",
	category: "buff",
	rarity: "epic",
	maxUses: 4,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			duration: { unit: "turns", value: 5 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 5,
			duration: { unit: "turns", value: 5 },
		},
	],
	tags: [],
});
