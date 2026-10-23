import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "adventurers_grace",
	name: "Adventurer's Grace",
	description: "Prevent all incoming damage during the opening rounds of your first battle.",
	icon: "skills/unique/adventurers_grace.png",
	pool: "unique",
	kind: "spell",
	category: "buff",
	rarity: "common",
	effects: [
		{
			type: "modifyDamageTaken",
			target: "self",
			operation: "multiply",
			value: 0,
			duration: { unit: "turns", value: 3 },
		},
	],
	tags: [],
});
