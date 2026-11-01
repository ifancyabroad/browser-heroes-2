import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "mana_shield",
	name: "Mana Shield",
	description: "Gain a shield that absorbs incoming damage for the current battle.",
	icon: "skills/common/mana_shield.png",
	pool: "common",
	kind: "spell",
	category: "defensive",
	rarity: "uncommon",
	maxUses: 1,
	effects: [
		{
			type: "shield",
			target: "self",
			amount: 20,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
