import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shield_of_the_archmage",
	name: "Shield of the Archmage",
	description: "Gain a temporary shield that absorbs incoming damage.",
	icon: "skills/unique/shield_of_the_archmage.png",
	pool: "unique",
	kind: "spell",
	category: "defensive",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "shield",
			target: "self",
			amount: 80,
			duration: { unit: "turns", value: 5 },
		},
	],
	tags: [],
});
