import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "last_stand",
	name: "Last Stand",
	description: "Restore your HP and gain a shield that absorbs incoming damage.",
	icon: "skills/fighter/last_stand.png",
	pool: "fighter",
	kind: "technique",
	category: "heal",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "8d12",
			attribute: "constitution",
		},
		{
			type: "shield",
			target: "self",
			amount: 100,
			duration: { unit: "turns", value: 1 },
		},
	],
	tags: [],
});
