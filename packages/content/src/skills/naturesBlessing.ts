import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "natures_blessing",
	name: "Nature's Blessing",
	description: "Invoke nature's venomous aspect to greatly empower poison damage.",
	icon: "skills/common/natures_blessing.png",
	pool: "common",
	kind: "prayer",
	category: "buff",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "poison",
			operation: "multiply",
			value: 1.75,
			durationTurns: 6,
		},
	],
	tags: [],
});
