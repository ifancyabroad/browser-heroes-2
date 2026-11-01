import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "arcane_shield",
	name: "Arcane Shield",
	description: "Gain a shield that absorbs incoming damage for the current battle.",
	icon: "skills/common/arcane_shield.png",
	pool: "common",
	kind: "spell",
	category: "defensive",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "shield",
			target: "self",
			amount: 40,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
