import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "boon_of_the_dawnflame",
	name: "Boon of the Dawnflame",
	description: "Call upon the Dawnflame to greatly empower radiant and fire damage.",
	icon: "skills/unique/boon_of_the_dawnflame.png",
	pool: "unique",
	kind: "spell",
	category: "buff",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "radiant",
			operation: "multiply",
			value: 1.5,
			durationTurns: 6,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "fire",
			operation: "multiply",
			value: 1.5,
			durationTurns: 6,
		},
	],
	tags: [],
});
