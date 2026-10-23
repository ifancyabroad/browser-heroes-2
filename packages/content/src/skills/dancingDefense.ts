import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dancing_defense",
	name: "Dancing Defense",
	description: "Gain advantage on attack rolls and increase your Armour Class.",
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
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 4,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
