import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "stoke_the_flames",
	name: "Stoke the Flames",
	description: "Increase your fire damage dealt for the current battle.",
	icon: "skills/unique/stoke_the_flames.png",
	pool: "unique",
	kind: "spell",
	category: "buff",
	rarity: "uncommon",
	maxUses: 1,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "fire",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
