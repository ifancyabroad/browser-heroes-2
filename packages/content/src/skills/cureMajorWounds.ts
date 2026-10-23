import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cure_major_wounds",
	name: "Cure Major Wounds",
	description: "Restore your HP.",
	icon: "skills/cleric/cure_major_wounds.png",
	pool: "cleric",
	kind: "prayer",
	category: "heal",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "7d6",
			attribute: "wisdom",
		},
	],
	tags: [],
});
