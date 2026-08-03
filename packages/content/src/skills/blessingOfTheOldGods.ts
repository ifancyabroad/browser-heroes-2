import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "blessing_of_the_old_gods",
	name: "Blessing of the Old Gods",
	description:
		"Invoke an ancient blessing that halves all incoming damage for the decisive phase of battle.",
	icon: "skills/unique/blessing_of_the_old_gods.png",
	pool: "unique",
	kind: "spell",
	category: "defensive",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "modifyDamageTaken",
			target: "self",
			operation: "multiply",
			value: 0.5,
			durationTurns: 5,
		},
	],
	tags: [],
});
